/**
 * CompTech Store - Native Vanilla JavaScript Application
 * Toko Aksesoris dan Sparepart Komputer
 * Zero-framework, Pure Native DOM & Event-Driven Architecture
 */

import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  STORE_INFO,
  DEFAULT_CATEGORIES,
} from "./data.js";

// State Management
const STATE = {
  products: [],
  cart: [],
  orders: [],
  activeCategory: "all",
  searchQuery: "",
  sortOrder: "default",
  isAdminLoggedIn: false,
  adminActiveTab: "dashboard",
  selectedProductForModal: null,
  activeInvoice: null,
};

// Currency Formatter: IDR (Rupiah)
export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Storage Helpers
function loadState() {
  try {
    const storedProducts = localStorage.getItem("comptech_products");

    // data.js adalah sumber utama katalog. Setiap kali isi data.js berubah
    // (tambah/ubah/hapus produk), katalog di browser otomatis ikut diperbarui.
    // Produk yang ditambah lewat Admin Portal (id tidak ada di data.js) tetap dipertahankan.
    const catalogSnapshot = JSON.stringify(INITIAL_PRODUCTS);
    const savedSnapshot = localStorage.getItem("comptech_catalog_snapshot");

    if (!storedProducts || savedSnapshot !== catalogSnapshot) {
      const initialIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
      const adminOnly = storedProducts
        ? JSON.parse(storedProducts).filter((p) => !initialIds.has(p.id))
        : [];
      STATE.products = [
        ...JSON.parse(catalogSnapshot),
        ...adminOnly,
      ];
      saveProducts();
      localStorage.setItem("comptech_catalog_snapshot", catalogSnapshot);
    } else {
      STATE.products = JSON.parse(storedProducts);
    }

    const storedCart = localStorage.getItem("comptech_cart");
    STATE.cart = storedCart ? JSON.parse(storedCart) : [];

    const storedOrders = localStorage.getItem("comptech_orders");
    STATE.orders = storedOrders ? JSON.parse(storedOrders) : INITIAL_ORDERS;

    const storedAuth = localStorage.getItem("comptech_admin_session");
    STATE.isAdminLoggedIn = storedAuth === "true";
  } catch (e) {
    console.error("Failed to load local storage:", e);
    STATE.products = INITIAL_PRODUCTS;
    STATE.cart = [];
    STATE.orders = INITIAL_ORDERS;
  }
}

function saveProducts() {
  localStorage.setItem("comptech_products", JSON.stringify(STATE.products));
}

function saveCart() {
  localStorage.setItem("comptech_cart", JSON.stringify(STATE.cart));
  updateCartBadge();
}

function saveOrders() {
  localStorage.setItem("comptech_orders", JSON.stringify(STATE.orders));
}

// Toast Notifications
export function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Update Cart Badge Counter
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

// Render Product Catalog Grid
export function renderCatalog() {
  const grid = document.getElementById("productGrid");
  const countLabel = document.getElementById("catalogCount");
  if (!grid) return;

  // Filter & Search
  let filtered = STATE.products.filter((p) => p.isActive !== false);

  if (STATE.activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === STATE.activeCategory);
  }

  if (STATE.searchQuery.trim() !== "") {
    const q = STATE.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  // Sort
  if (STATE.sortOrder === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (STATE.sortOrder === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (STATE.sortOrder === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (STATE.sortOrder === "stock-high") {
    filtered.sort((a, b) => b.stock - a.stock);
  }

  if (countLabel) {
    countLabel.textContent = `Menampilkan ${filtered.length} dari ${STATE.products.length} sparepart`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Produk Tidak Ditemukan</h3>
        <p>Maaf, tidak ada sparepart komputer yang cocok dengan kriteria pencarian "${escapeHtml(STATE.searchQuery)}".</p>
        <button id="btnResetFilter" class="btn-detail-quick" style="display:inline-block; margin:0 auto;">Reset Filter & Pencarian</button>
      </div>
    `;
    const resetBtn = document.getElementById("btnResetFilter");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        STATE.activeCategory = "all";
        STATE.searchQuery = "";
        const searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.value = "";
        updateCategoryTabs();
        renderCatalog();
      });
    }
    return;
  }

  grid.innerHTML = filtered
    .map((product) => {
      let stockClass = "stock-in";
      let stockText = `Stok Tersedia (${product.stock})`;
      if (product.stock === 0) {
        stockClass = "stock-out";
        stockText = "Stok Habis";
      } else if (product.stock <= 3) {
        stockClass = "stock-low";
        stockText = `Sisa ${product.stock} Unit!`;
      }

      return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="card-image-box">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='/src/assets/images/hero_pc_hardware_1793276196267.jpg'">
          ${product.badge ? `<span class="card-badge-line">${escapeHtml(product.badge)}</span>` : ""}
        </div>
        <div class="card-content">
          <div class="card-meta-line">
            <span class="card-brand">${escapeHtml(product.brand)}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(product.categoryName)}</span>
          </div>
          <h3 class="card-title" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
          <div class="card-stock-line">
            <span class="stock-indicator ${stockClass}">●</span>
            <span class="${stockClass}">${stockText}</span>
            <span aria-hidden="true" style="color:var(--text-muted)">·</span>
            <span style="color:var(--text-muted); font-size:11px;">Garansi Resmi</span>
          </div>
          <div class="card-footer">
            <div class="price-box">
              <span class="price-label">Harga Satuan</span>
              <span class="price-val tabular-nums">${formatRupiah(product.price)}</span>
            </div>
            <div class="card-actions">
              <button class="btn-detail-quick" data-action="detail" data-id="${product.id}">Detail</button>
              <button class="btn-add-cart-quick" data-action="add-cart" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>
                ${product.stock === 0 ? "Habis" : "+ Keranjang"}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

// Category Tabs UI Handler
function updateCategoryTabs() {
  const tabs = document.querySelectorAll(".category-tab");
  tabs.forEach((tab) => {
    const cat = tab.getAttribute("data-cat");
    if (cat === STATE.activeCategory) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

// Open Product Detail Modal
export function openProductDetail(productId) {
  const product = STATE.products.find((p) => p.id === Number(productId));
  if (!product) return;

  STATE.selectedProductForModal = product;
  const modal = document.getElementById("productDetailModal");
  const body = document.getElementById("pdpModalContent");
  if (!modal || !body) return;

  let stockClass = "stock-in";
  let stockText = `Tersedia ${product.stock} Unit`;
  if (product.stock === 0) {
    stockClass = "stock-out";
    stockText = "Stok Habis";
  } else if (product.stock <= 3) {
    stockClass = "stock-low";
    stockText = `Tersisa ${product.stock} Unit Saja`;
  }

  const specsRows = (product.specifications || [])
    .map(
      (s) => `
    <tr>
      <td>${escapeHtml(s.label)}</td>
      <td>${escapeHtml(s.value)}</td>
    </tr>
  `,
    )
    .join("");

  body.innerHTML = `
    <div class="pdp-grid">
      <div class="pdp-gallery-box">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" onerror="this.onerror=null;this.src='/src/assets/images/hero_pc_hardware_1793276196267.jpg'">
      </div>
      <div class="pdp-info">
        <div class="pdp-meta-line">
          <span class="card-brand">${escapeHtml(product.brand)}</span>
          <span aria-hidden="true">·</span>
          <span>${escapeHtml(product.categoryName)}</span>
          <span aria-hidden="true">·</span>
          <span class="${stockClass} font-semibold">${stockText}</span>
        </div>
        <h2 class="pdp-title">${escapeHtml(product.name)}</h2>
        <div class="pdp-price-box">
          <span style="font-size:13px; color:var(--text-secondary)">Harga Resmi (Termasuk PPN)</span>
          <span class="pdp-price-val tabular-nums">${formatRupiah(product.price)}</span>
        </div>
        <p class="pdp-desc">${escapeHtml(product.description)}</p>

        <div>
          <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">
            Spesifikasi Teknis
          </h4>
          <table class="pdp-specs-table">
            <tbody>
              ${specsRows}
              <tr>
                <td>Garansi Produk</td>
                <td>${escapeHtml(product.warranty || "Garansi Resmi Distributor Indonesia")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pdp-buy-module">
          <div class="pdp-qty-group">
            <span style="font-size:13px; color:var(--text-secondary)">Jumlah:</span>
            <input type="number" id="pdpQtyInput" class="pdp-qty-input tabular-nums" value="1" min="1" max="${product.stock}" ${product.stock === 0 ? "disabled" : ""}>
          </div>
          <button id="btnPdpAddToCart" class="btn-pdp-cart" ${product.stock === 0 ? "disabled" : ""}>
            ${product.stock === 0 ? "Stok Tidak Tersedia" : "Masukkan ke Keranjang"}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");

  // PDP Button Listener
  const addBtn = document.getElementById("btnPdpAddToCart");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qtyInput = document.getElementById("pdpQtyInput");
      const qty = Math.max(
        1,
        Math.min(product.stock, parseInt(qtyInput ? qtyInput.value : "1") || 1),
      );
      addToCart(product.id, qty);
      closeModal("productDetailModal");
    });
  }
}

// Add Item To Cart
export function addToCart(productId, quantity = 1) {
  const product = STATE.products.find((p) => p.id === Number(productId));
  if (!product) return;

  if (product.stock === 0) {
    showToast("Maaf, produk ini sedang habis.", "warning");
    return;
  }

  const existing = STATE.cart.find((item) => item.productId === product.id);
  const currentInCart = existing ? existing.quantity : 0;

  if (currentInCart + quantity > product.stock) {
    showToast(
      `Jumlah melebihi stok yang tersedia (Maks. ${product.stock})`,
      "warning",
    );
    return;
  }

  if (existing) {
    existing.quantity += quantity;
  } else {
    STATE.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: quantity,
    });
  }

  saveCart();
  renderCartDrawer();
  showToast(
    `"${product.name.slice(0, 28)}..." berhasil ditambahkan ke keranjang.`,
  );
}

// Render Cart Drawer
export function renderCartDrawer() {
  const container = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotalVal");
  const checkoutBtn = document.getElementById("btnOpenCheckout");
  if (!container || !subtotalEl) return;

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 12px; color:var(--text-muted)">
        <p style="font-size:15px; margin-bottom:8px; color:var(--text-primary); font-weight:600;">Keranjang Belanja Kosong</p>
        <p style="font-size:13px;">Silakan pilih sparepart komputer pilihan Anda dari katalog kami.</p>
      </div>
    `;
    subtotalEl.textContent = "Rp 0";
    if (checkoutBtn) checkoutBtn.setAttribute("disabled", "true");
    return;
  }

  if (checkoutBtn) checkoutBtn.removeAttribute("disabled");

  let total = 0;
  container.innerHTML = STATE.cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${escapeHtml(item.name)}">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</h4>
          <span class="cart-item-price tabular-nums">${formatRupiah(item.price)}</span>
          <div class="cart-qty-stepper">
            <button class="btn-stepper" data-cart-action="dec" data-id="${item.productId}">-</button>
            <span class="qty-number tabular-nums">${item.quantity}</span>
            <button class="btn-stepper" data-cart-action="inc" data-id="${item.productId}">+</button>
            <span style="font-size:11px; color:var(--text-muted); margin-left:6px;">(Maks: ${item.stock})</span>
          </div>
        </div>
        <button class="btn-item-remove" data-cart-action="remove" data-id="${item.productId}" title="Hapus Item">&times;</button>
      </div>
    `;
    })
    .join("");

  subtotalEl.textContent = formatRupiah(total);
}

// Open Checkout Modal
export function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast("Keranjang masih kosong.", "warning");
    return;
  }

  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  // Render items preview in checkout modal
  const preview = document.getElementById("checkoutItemsPreview");
  const subtotalEl = document.getElementById("checkoutSubtotal");
  const shippingEl = document.getElementById("checkoutShipping");
  const grandTotalEl = document.getElementById("checkoutGrandTotal");

  const subtotal = STATE.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = 35000; // Flat initial shipping estimate
  const grandTotal = subtotal + shippingFee;

  if (preview) {
    preview.innerHTML = STATE.cart
      .map(
        (item) => `
      <div class="order-preview-row">
        <span class="order-preview-name">${item.quantity}x ${escapeHtml(item.name)}</span>
        <span class="order-preview-price tabular-nums">${formatRupiah(item.price * item.quantity)}</span>
      </div>
    `,
      )
      .join("");
  }

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (shippingEl) shippingEl.textContent = formatRupiah(shippingFee);
  if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);

  // Close cart drawer & open checkout modal
  closeDrawer("cartDrawer");
  modal.classList.add("active");
}

// Handle Order Submission
function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (STATE.cart.length === 0) {
    showToast("Keranjang belanja kosong!", "warning");
    return;
  }

  const name = document.getElementById("checkoutName").value.trim();
  const phone = document.getElementById("checkoutPhone").value.trim();
  const address = document.getElementById("checkoutAddress").value.trim();
  const city = document.getElementById("checkoutCity").value.trim();
  const courier = document.getElementById("checkoutCourier").value;
  const paymentMethod = document.getElementById("checkoutPayment").value;
  const notes = document.getElementById("checkoutNotes").value.trim();

  if (!name || !phone || !address || !city) {
    showToast("Harap lengkapi semua data wajib pada formulir.", "warning");
    return;
  }

  // Check stock validity before locking order
  for (const item of STATE.cart) {
    const prod = STATE.products.find((p) => p.id === item.productId);
    if (!prod || prod.stock < item.quantity) {
      showToast(
        `Stok untuk "${item.name}" tidak mencukupi (Tersedia: ${prod ? prod.stock : 0}).`,
        "warning",
      );
      return;
    }
  }

  const subtotal = STATE.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  let shippingFee = 35000;
  if (courier.includes("Ambil")) shippingFee = 0;
  const grandTotal = subtotal + shippingFee;

  // Generate Unique Order Code CPT-YYYYMMDD-XXXX
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
  const randCode = Math.floor(1000 + Math.random() * 9000);
  const orderCode = `CPT-${dateStr}-${randCode}`;

  const newOrder = {
    id: orderCode,
    customerName: name,
    customerPhone: phone,
    address: address,
    city: city,
    courier: courier,
    paymentMethod: paymentMethod,
    notes: notes || "-",
    items: STATE.cart.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.price * i.quantity,
    })),
    subtotal: subtotal,
    shippingFee: shippingFee,
    total: grandTotal,
    status: "Menunggu Konfirmasi",
    createdAt: new Date().toLocaleString("id-ID"),
  };

  // Reduce product stock consistently
  STATE.cart.forEach((cartItem) => {
    const prod = STATE.products.find((p) => p.id === cartItem.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - cartItem.quantity);
    }
  });
  saveProducts();

  // Save order to history
  STATE.orders.unshift(newOrder);
  saveOrders();

  // Empty cart
  STATE.cart = [];
  saveCart();

  // Close Checkout Modal & Open Invoice Receipt
  closeModal("checkoutModal");
  renderCatalog();
  openInvoiceModal(newOrder);
  showToast(`Pesanan ${orderCode} berhasil dibuat!`);
}

// Open Invoice / Nota Modal
export function openInvoiceModal(order) {
  STATE.activeInvoice = order;
  const modal = document.getElementById("invoiceModal");
  const printArea = document.getElementById("invoicePrintArea");
  if (!modal || !printArea) return;

  const itemsRows = order.items
    .map(
      (item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td style="text-align:center" class="tabular-nums">${item.quantity}</td>
      <td style="text-align:right" class="tabular-nums">${formatRupiah(item.price)}</td>
      <td style="text-align:right; font-weight:700;" class="tabular-nums">${formatRupiah(item.subtotal)}</td>
    </tr>
  `,
    )
    .join("");

  printArea.innerHTML = `
    <div class="invoice-header">
      <div>
        <h2 class="invoice-logo-title">${STORE_INFO.name}</h2>
        <p class="invoice-store-sub">${STORE_INFO.subtitle}</p>
        <p style="font-size:11px; color:#64748b; margin-top:4px;">${STORE_INFO.address}</p>
        <p style="font-size:11px; color:#64748b;">WhatsApp: ${STORE_INFO.phone} · Web: comptech.store</p>
      </div>
      <div class="invoice-meta">
        <p style="font-size:12px; font-weight:600; color:#64748b;">BUKTI PEMESANAN / INVOICE</p>
        <p class="invoice-code">${order.id}</p>
        <p style="font-size:11px; color:#64748b; margin-top:4px;">Tanggal: ${order.createdAt}</p>
        <p style="font-size:11px; font-weight:700; color:#d97706; margin-top:2px;">Status: ${order.status}</p>
      </div>
    </div>

    <div class="invoice-details-grid">
      <div>
        <h4 class="invoice-section-h">Informasi Pemesan</h4>
        <p><strong>Nama:</strong> ${escapeHtml(order.customerName)}</p>
        <p><strong>Kontak / WA:</strong> ${escapeHtml(order.customerPhone)}</p>
        <p><strong>Alamat:</strong> ${escapeHtml(order.address)}, ${escapeHtml(order.city)}</p>
      </div>
      <div>
        <h4 class="invoice-section-h">Metode & Pengiriman</h4>
        <p><strong>Kurir:</strong> ${escapeHtml(order.courier)}</p>
        <p><strong>Pembayaran:</strong> ${escapeHtml(order.paymentMethod)}</p>
        <p><strong>Catatan:</strong> ${escapeHtml(order.notes)}</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Nama Sparepart Komputer</th>
          <th style="text-align:center">Qty</th>
          <th style="text-align:right">Harga Satuan</th>
          <th style="text-align:right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="invoice-total-section">
      <div class="invoice-total-row">
        <span>Subtotal Produk:</span>
        <span class="tabular-nums">${formatRupiah(order.subtotal)}</span>
      </div>
      <div class="invoice-total-row">
        <span>Ongkos Kirim & Asuransi:</span>
        <span class="tabular-nums">${formatRupiah(order.shippingFee)}</span>
      </div>
      <div class="invoice-total-row invoice-grand-total">
        <span>TOTAL TAGIHAN:</span>
        <span class="tabular-nums">${formatRupiah(order.total)}</span>
      </div>
    </div>

    <div class="invoice-payment-info">
      <p style="font-weight:700; color:#0f172a; margin-bottom:4px;">Petunjuk Konfirmasi Pembayaran:</p>
      <p>Silakan transfer tepat sebesar <strong class="tabular-nums">${formatRupiah(order.total)}</strong> ke rekening resmi toko:</p>
      <ul style="margin: 6px 0 6px 20px;">
        ${STORE_INFO.bankAccounts.map((b) => `<li><strong>${b.bank}:</strong> ${b.number} a.n ${b.holder}</li>`).join("")}
      </ul>
      <p>Setelah melakukan transfer, silakan konfirmasi bukti pembayaran ke WhatsApp admin kami untuk segera diproses dan dikirimkan.</p>
    </div>

    <div class="invoice-actions">
      <button class="btn-print" id="btnPrintInvoice">Cetak Invoice (PDF)</button>
      <a class="btn-wa-confirm" href="https://api.whatsapp.com/send?phone=${STORE_INFO.whatsapp}&text=Halo%20Admin%20CompTech%2C%20saya%20ingin%20konfirmasi%20pesanan%20dengan%20Kode%20${order.id}%20sebesar%20${encodeURIComponent(formatRupiah(order.total))}" target="_blank" rel="noopener">
        Konfirmasi via WhatsApp
      </a>
    </div>
  `;

  modal.classList.add("active");

  const printBtn = document.getElementById("btnPrintInvoice");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
}

// ---------------- Admin Portal ----------------
export function openAdminPortal() {
  const modal = document.getElementById("adminModal");
  if (!modal) return;

  modal.classList.add("active");
  renderAdminContent();
}

function renderAdminContent() {
  const container = document.getElementById("adminDynamicContent");
  if (!container) return;

  if (!STATE.isAdminLoggedIn) {
    // Show Login Screen
    container.innerHTML = `
      <div style="max-width:380px; margin:40px auto; text-align:center;">
        <h3 style="font-size:20px; font-weight:800; margin-bottom:6px;">Masuk Panel Pengelola</h3>
        <p style="font-size:13px; color:var(--text-secondary); margin-bottom:24px;">Hanya admin toko resmi yang memiliki izin akses.</p>
        
        <form id="adminLoginForm" style="text-align:left;">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" id="adminUser" class="form-input" placeholder="admin" required value="admin">
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="adminPass" class="form-input" placeholder="admin123" required value="admin123">
          </div>
          <button type="submit" class="drawer-btn-checkout" style="margin-top:12px;">Masuk Sekarang</button>
        </form>
        <p style="font-size:12px; color:var(--text-muted); margin-top:16px;">
          Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </div>
    `;

    const form = document.getElementById("adminLoginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const u = document.getElementById("adminUser").value.trim();
        const p = document.getElementById("adminPass").value.trim();
        if (u === "admin" && p === "admin123") {
          STATE.isAdminLoggedIn = true;
          localStorage.setItem("comptech_admin_session", "true");
          showToast("Login admin berhasil!");
          renderAdminContent();
        } else {
          showToast("Kredensial admin salah!", "warning");
        }
      });
    }
    return;
  }

  // Admin Logged In: Show Tab Navigation & Content
  const totalItems = STATE.products.length;
  const inventoryValue = STATE.products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );
  const pendingOrders = STATE.orders.filter(
    (o) => o.status === "Menunggu Konfirmasi",
  ).length;
  const lowStockCount = STATE.products.filter((p) => p.stock <= 3).length;

  let tabHtml = "";

  if (STATE.adminActiveTab === "dashboard") {
    tabHtml = `
      <div class="admin-kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Total Sparepart Terdaftar</span>
          <span class="kpi-val tabular-nums">${totalItems} Item</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Nilai Total Inventaris</span>
          <span class="kpi-val tabular-nums" style="color:var(--accent-cyan); font-size:17px;">${formatRupiah(inventoryValue)}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Pesanan Menunggu</span>
          <span class="kpi-val tabular-nums" style="color:var(--accent-amber);">${pendingOrders} Pesanan</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Peringatan Stok Rendah</span>
          <span class="kpi-val tabular-nums" style="color:${lowStockCount > 0 ? "var(--accent-rose)" : "var(--accent-emerald)"};">${lowStockCount} Produk</span>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <h4 style="font-size:15px; font-weight:700;">Pesanan Terbaru</h4>
        <button id="btnGoOrdersTab" class="admin-action-btn">Lihat Semua Pesanan</button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Kode Pesanan</th>
              <th>Pemesan</th>
              <th>Total Tagihan</th>
              <th>Status</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            ${STATE.orders
              .slice(0, 5)
              .map(
                (o) => `
              <tr>
                <td class="tabular-nums font-semibold" style="color:var(--accent-cyan);">${o.id}</td>
                <td>${escapeHtml(o.customerName)} (${escapeHtml(o.customerPhone)})</td>
                <td class="tabular-nums">${formatRupiah(o.total)}</td>
                <td><span class="badge-status ${getStatusClass(o.status)}">${o.status}</span></td>
                <td style="color:var(--text-muted); font-size:12px;">${o.createdAt}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (STATE.adminActiveTab === "products") {
    tabHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h4 style="font-size:16px; font-weight:700;">Kelola Katalog Produk (${STATE.products.length})</h4>
        <button id="btnOpenAddProduct" class="btn-cart" style="padding:7px 14px; font-size:13px;">+ Tambah Sparepart Baru</button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${STATE.products
              .map(
                (p) => `
              <tr>
                <td class="tabular-nums">${p.id}</td>
                <td style="font-weight:600; max-width:280px;">${escapeHtml(p.name)}</td>
                <td style="color:var(--text-muted);">${escapeHtml(p.categoryName)}</td>
                <td class="tabular-nums">${formatRupiah(p.price)}</td>
                <td>
                  <input type="number" class="admin-stock-quick tabular-nums form-input" data-prod-id="${p.id}" value="${p.stock}" min="0" style="width:70px; padding:4px 8px; font-size:12px;">
                </td>
                <td>
                  <div style="display:flex; gap:6px;">
                    <button class="admin-action-btn" data-admin-action="edit-product" data-id="${p.id}">Ubah</button>
                    <button class="admin-action-btn danger" data-admin-action="delete-product" data-id="${p.id}">Hapus</button>
                  </div>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (STATE.adminActiveTab === "orders") {
    tabHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h4 style="font-size:16px; font-weight:700;">Kelola Pesanan Masuk (${STATE.orders.length})</h4>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Pemesan</th>
              <th>Items</th>
              <th>Total</th>
              <th>Kurir & Bayar</th>
              <th>Status</th>
              <th>Ubah Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${STATE.orders
              .map(
                (o) => `
              <tr>
                <td class="tabular-nums font-semibold" style="color:var(--accent-cyan);">${o.id}</td>
                <td>
                  <strong>${escapeHtml(o.customerName)}</strong><br>
                  <span style="font-size:12px; color:var(--text-muted);">${escapeHtml(o.customerPhone)}</span><br>
                  <span style="font-size:11px; color:var(--text-muted);">${escapeHtml(o.city)}</span>
                </td>
                <td>
                  <ul style="font-size:12px; padding-left:14px; margin:0;">
                    ${o.items.map((it) => `<li>${it.quantity}x ${escapeHtml(it.name)}</li>`).join("")}
                  </ul>
                </td>
                <td class="tabular-nums font-semibold">${formatRupiah(o.total)}</td>
                <td style="font-size:12px;">
                  ${escapeHtml(o.courier)}<br>
                  <span style="color:var(--accent-cyan);">${escapeHtml(o.paymentMethod)}</span>
                </td>
                <td>
                  <span class="badge-status ${getStatusClass(o.status)}">${o.status}</span>
                </td>
                <td>
                  <select class="form-select admin-status-select" data-order-id="${o.id}" style="padding:4px 8px; font-size:12px; width:140px;">
                    <option value="Menunggu Konfirmasi" ${o.status === "Menunggu Konfirmasi" ? "selected" : ""}>Menunggu Konfirmasi</option>
                    <option value="Diproses" ${o.status === "Diproses" ? "selected" : ""}>Diproses</option>
                    <option value="Selesai" ${o.status === "Selesai" ? "selected" : ""}>Selesai</option>
                    <option value="Dibatalkan" ${o.status === "Dibatalkan" ? "selected" : ""}>Dibatalkan</option>
                  </select>
                </td>
                <td>
                  <button class="admin-action-btn danger" data-admin-action="delete-order" data-order-id="${o.id}">Hapus</button>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (STATE.adminActiveTab === "database") {
    tabHtml = `
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:24px;">
        <h4 style="font-size:16px; font-weight:700; margin-bottom:8px;">Ekspor Skema Database MySQL (XAMPP / phpMyAdmin)</h4>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
          Sesuai dengan panduan arsitektur sistem <strong>CompTech Store</strong>, Anda dapat mengunduh atau menyalin skema SQL lengkap untuk tabel <code>categories</code>, <code>products</code>, <code>admins</code>, <code>orders</code>, dan <code>order_items</code> untuk diimpor ke phpMyAdmin lokal.
        </p>
        <div style="display:flex; gap:12px; margin-bottom:20px;">
          <button id="btnDownloadSql" class="btn-cart">Download comptech_store.sql</button>
          <button id="btnResetDemoData" class="admin-action-btn danger">Reset ke Data Katalog Awal</button>
        </div>
        <p style="font-size:12px; color:var(--text-muted);">
          File SQL tersimpan di <code>/database/comptech_store.sql</code> dalam struktur direktori proyek Anda.
        </p>
      </div>
    `;
  }

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
      <div style="display:flex; gap:8px;">
        <button class="admin-tab ${STATE.adminActiveTab === "dashboard" ? "active" : ""}" data-tab="dashboard">Dashboard</button>
        <button class="admin-tab ${STATE.adminActiveTab === "products" ? "active" : ""}" data-tab="products">Kelola Produk</button>
        <button class="admin-tab ${STATE.adminActiveTab === "orders" ? "active" : ""}" data-tab="orders">Kelola Pesanan</button>
        <button class="admin-tab ${STATE.adminActiveTab === "database" ? "active" : ""}" data-tab="database">Database SQL</button>
      </div>
      <button id="btnAdminLogout" class="admin-action-btn danger">Keluar Admin</button>
    </div>
    <div>${tabHtml}</div>
  `;

  // Attach Admin Event Listeners
  attachAdminListeners();
}

function getStatusClass(status) {
  if (status === "Menunggu Konfirmasi") return "status-pending";
  if (status === "Diproses") return "status-processing";
  if (status === "Selesai") return "status-completed";
  if (status === "Dibatalkan") return "status-cancelled";
  return "";
}

function attachAdminListeners() {
  // Tabs
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      STATE.adminActiveTab = e.target.getAttribute("data-tab");
      renderAdminContent();
    });
  });

  const goOrders = document.getElementById("btnGoOrdersTab");
  if (goOrders) {
    goOrders.addEventListener("click", () => {
      STATE.adminActiveTab = "orders";
      renderAdminContent();
    });
  }

  // Logout
  const logoutBtn = document.getElementById("btnAdminLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      STATE.isAdminLoggedIn = false;
      localStorage.removeItem("comptech_admin_session");
      showToast("Anda telah keluar dari panel admin.");
      renderAdminContent();
    });
  }

  // Quick stock change in products table
  document.querySelectorAll(".admin-stock-quick").forEach((inp) => {
    inp.addEventListener("change", (e) => {
      const prodId = Number(e.target.getAttribute("data-prod-id"));
      const newStock = Math.max(0, parseInt(e.target.value) || 0);
      const prod = STATE.products.find((p) => p.id === prodId);
      if (prod) {
        prod.stock = newStock;
        saveProducts();
        renderCatalog();
        showToast(
          `Stok "${prod.name.slice(0, 20)}..." diubah menjadi ${newStock}.`,
        );
      }
    });
  });

  // Status Change in orders table
  document.querySelectorAll(".admin-status-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const orderId = e.target.getAttribute("data-order-id");
      const newStatus = e.target.value;
      const order = STATE.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
        saveOrders();
        showToast(`Status pesanan ${orderId} diubah ke "${newStatus}".`);
        renderAdminContent();
      }
    });
  });

  // Delete order
  document
    .querySelectorAll('[data-admin-action="delete-order"]')
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const orderId = e.currentTarget.getAttribute("data-order-id");
        if (confirm(`Yakin ingin menghapus pesanan ${orderId}?`)) {
          STATE.orders = STATE.orders.filter((o) => o.id !== orderId);
          saveOrders();
          renderAdminContent();
          showToast("Pesanan berhasil dihapus.");
        }
      });
    });

  // Delete product
  document
    .querySelectorAll('[data-admin-action="delete-product"]')
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.getAttribute("data-id"));
        const prod = STATE.products.find((p) => p.id === id);
        if (
          prod &&
          confirm(`Yakin ingin menghapus "${prod.name}" dari katalog?`)
        ) {
          STATE.products = STATE.products.filter((p) => p.id !== id);
          saveProducts();
          renderCatalog();
          renderAdminContent();
          showToast("Produk berhasil dihapus.");
        }
      });
    });

  // Edit product
  document
    .querySelectorAll('[data-admin-action="edit-product"]')
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.getAttribute("data-id"));
        openEditProductModal(id);
      });
    });

  // Add Product Button
  const addBtn = document.getElementById("btnOpenAddProduct");
  if (addBtn) {
    addBtn.addEventListener("click", () => openAddProductModal());
  }

  // Download SQL
  const dlSql = document.getElementById("btnDownloadSql");
  if (dlSql) {
    dlSql.addEventListener("click", () => {
      fetch("/database/comptech_store.sql")
        .then((res) => res.text())
        .then((sql) => {
          const blob = new Blob([sql], { type: "application/sql" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "comptech_store.sql";
          document.body.appendChild(a);
          a.click();
          a.remove();
          showToast("File SQL comptech_store.sql berhasil diunduh.");
        })
        .catch(() => showToast("Gagal mengunduh file SQL.", "warning"));
    });
  }

  // Reset Demo Data
  const resetBtn = document.getElementById("btnResetDemoData");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (
        confirm("Kembalikan seluruh produk dan pesanan ke data awal pabrik?")
      ) {
        STATE.products = INITIAL_PRODUCTS;
        STATE.orders = INITIAL_ORDERS;
        saveProducts();
        saveOrders();
        renderCatalog();
        renderAdminContent();
        showToast("Katalog berhasil di-reset ke data bawaan.");
      }
    });
  }
}

// Add / Edit Product Modals
function openAddProductModal() {
  const modal = document.getElementById("productFormModal");
  const form = document.getElementById("productForm");
  const title = document.getElementById("productFormTitle");
  if (!modal || !form || !title) return;

  title.textContent = "Tambah Sparepart Komputer Baru";
  form.reset();
  document.getElementById("formProductId").value = "";

  modal.classList.add("active");
}

function openEditProductModal(productId) {
  const product = STATE.products.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("productFormModal");
  const title = document.getElementById("productFormTitle");
  if (!modal || !title) return;

  title.textContent = "Edit Data Sparepart Komputer";
  document.getElementById("formProductId").value = product.id;
  document.getElementById("formProdName").value = product.name;
  document.getElementById("formProdBrand").value = product.brand;
  document.getElementById("formProdCategory").value = product.category;
  document.getElementById("formProdPrice").value = product.price;
  document.getElementById("formProdStock").value = product.stock;
  document.getElementById("formProdBadge").value = product.badge || "";
  document.getElementById("formProdImage").value = product.image;
  document.getElementById("formProdDesc").value = product.description;

  modal.classList.add("active");
}

function handleProductFormSubmit(e) {
  e.preventDefault();
  const idVal = document.getElementById("formProductId").value;
  const name = document.getElementById("formProdName").value.trim();
  const brand = document.getElementById("formProdBrand").value.trim();
  const cat = document.getElementById("formProdCategory").value;
  const price = parseFloat(document.getElementById("formProdPrice").value) || 0;
  const stock = parseInt(document.getElementById("formProdStock").value) || 0;
  const badge = document.getElementById("formProdBadge").value.trim();
  const image =
    document.getElementById("formProdImage").value.trim() ||
    "/src/assets/images/hero_pc_hardware_1793276196267.jpg";
  const desc = document.getElementById("formProdDesc").value.trim();

  const catObj = DEFAULT_CATEGORIES.find((c) => c.id === cat) || {
    name: "Aksesori",
  };

  if (idVal) {
    // Edit existing
    const prod = STATE.products.find((p) => p.id === Number(idVal));
    if (prod) {
      prod.name = name;
      prod.brand = brand;
      prod.category = cat;
      prod.categoryName = catObj.name;
      prod.price = price;
      prod.stock = stock;
      prod.badge = badge;
      prod.image = image;
      prod.description = desc;
      showToast("Data produk berhasil diperbarui.");
    }
  } else {
    // Add new
    const nextId = Math.max(...STATE.products.map((p) => p.id), 0) + 1;
    const newProd = {
      id: nextId,
      name,
      brand,
      category: cat,
      categoryName: catObj.name,
      price,
      stock,
      badge,
      image,
      description: desc,
      warranty: "Garansi Resmi Toko & Distributor 1 Tahun",
      specifications: [
        { label: "Kategori", value: catObj.name },
        { label: "Brand", value: brand },
      ],
      isActive: true,
    };
    STATE.products.unshift(newProd);
    showToast("Produk baru berhasil ditambahkan.");
  }

  saveProducts();
  renderCatalog();
  renderAdminContent();
  closeModal("productFormModal");
}

// ---------------- Modal & Drawer Helpers ----------------
export function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (drawer) {
    drawer.classList.add("active");
    renderCartDrawer();
  }
}

export function closeDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (drawer) drawer.classList.remove("active");
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// Security: Basic HTML escaping
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------- Initialization & Event Wiring ----------------
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateCartBadge();
  renderCatalog();

  // Search input handler
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      STATE.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Sort select handler
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      STATE.sortOrder = e.target.value;
      renderCatalog();
    });
  }

  // Category filter tabs
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      STATE.activeCategory = e.currentTarget.getAttribute("data-cat");
      updateCategoryTabs();
      renderCatalog();
    });
  });

  // Delegated clicks for catalog grid
  const grid = document.getElementById("productGrid");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const detailBtn = e.target.closest('[data-action="detail"]');
      const addCartBtn = e.target.closest('[data-action="add-cart"]');

      if (detailBtn) {
        const id = detailBtn.getAttribute("data-id");
        openProductDetail(id);
      } else if (addCartBtn) {
        const id = addCartBtn.getAttribute("data-id");
        addToCart(id, 1);
      }
    });
  }

  // Cart Drawer open/close triggers
  const btnCartOpen = document.getElementById("btnCartOpen");
  if (btnCartOpen) {
    btnCartOpen.addEventListener("click", () => openDrawer("cartDrawer"));
  }

  const btnCloseDrawer = document.getElementById("btnCloseCartDrawer");
  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener("click", () => closeDrawer("cartDrawer"));
  }

  const cartDrawerBackdrop = document.getElementById("cartDrawer");
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener("click", (e) => {
      if (e.target === cartDrawerBackdrop) closeDrawer("cartDrawer");
    });
  }

  // Cart Drawer Action Delegation (+, -, remove)
  const cartList = document.getElementById("cartItemsList");
  if (cartList) {
    cartList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cart-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-cart-action");
      const id = Number(btn.getAttribute("data-id"));
      const item = STATE.cart.find((i) => i.productId === id);
      if (!item) return;

      if (action === "inc") {
        if (item.quantity < item.stock) {
          item.quantity += 1;
          saveCart();
          renderCartDrawer();
        } else {
          showToast(`Stok maksimal tersedia adalah ${item.stock}`, "warning");
        }
      } else if (action === "dec") {
        if (item.quantity > 1) {
          item.quantity -= 1;
          saveCart();
          renderCartDrawer();
        } else {
          STATE.cart = STATE.cart.filter((i) => i.productId !== id);
          saveCart();
          renderCartDrawer();
        }
      } else if (action === "remove") {
        STATE.cart = STATE.cart.filter((i) => i.productId !== id);
        saveCart();
        renderCartDrawer();
        showToast("Item dihapus dari keranjang.");
      }
    });
  }

  // Clear cart button
  const btnClearCart = document.getElementById("btnClearCart");
  if (btnClearCart) {
    btnClearCart.addEventListener("click", () => {
      if (
        STATE.cart.length > 0 &&
        confirm("Kosongkan semua barang dari keranjang belanja?")
      ) {
        STATE.cart = [];
        saveCart();
        renderCartDrawer();
        showToast("Keranjang telah dikosongkan.");
      }
    });
  }

  // Open Checkout from Drawer
  const btnOpenCheckout = document.getElementById("btnOpenCheckout");
  if (btnOpenCheckout) {
    btnOpenCheckout.addEventListener("click", () => openCheckoutModal());
  }

  // Checkout Form Submission
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }

  // Admin Modal trigger
  const btnAdminNav = document.getElementById("btnAdminNav");
  if (btnAdminNav) {
    btnAdminNav.addEventListener("click", () => openAdminPortal());
  }
  const btnAdminFooter = document.getElementById("btnAdminFooter");
  if (btnAdminFooter) {
    btnAdminFooter.addEventListener("click", (e) => {
      e.preventDefault();
      openAdminPortal();
    });
  }

  // Product Form Submission (Admin Add/Edit)
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", handleProductFormSubmit);
  }

  // Generic Modal Close Buttons & Backdrops
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close-modal");
      closeModal(modalId);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  // ESC key closes any open drawer or modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer("cartDrawer");
      document
        .querySelectorAll(".modal-overlay.active")
        .forEach((m) => m.classList.remove("active"));
    }
  });
});