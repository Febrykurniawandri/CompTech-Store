# CompTech Store — Toko Aksesoris dan Sparepart Komputer

Website e-commerce penjualan sparepart dan komponen komputer dengan arsitektur **HTML, CSS, dan JavaScript murni native (tanpa framework external)**, dilengkapi aset foto produk beresolusi tinggi, keranjang belanja, proses checkout ber-kode unik, nota invoice siap cetak, serta panel admin pengelola stok & pesanan.

---

## 💻 Fitur Utama

1. **Katalog Produk Interaktif**
   - Pencarian real-time berdasarkan nama produk, brand, dan deskripsi.
   - Filter cepat berdasarkan kategori: *VGA / GPU*, *Processor / CPU*, *Motherboard*, *RAM*, *SSD / Storage*, *Power Supply*, *Monitor & Aksesori*.
   - Pengurutan harga (termurah/termahal), nama (A-Z), dan stok terbanyak.
   - Indikator stok cerdas (*Tersedia*, *Sisa X Unit*, *Stok Habis*).

2. **Detail Produk (PDP)**
   - Foto produk studio resolusi tinggi.
   - Rincian tabel spesifikasi teknis lengkap.
   - Informasi garansi distributor resmi Indonesia.
   - Kontrol pemilihan kuantitas dengan validasi batas stok.

3. **Keranjang Belanja (Slide Drawer)**
   - Stepper jumlah barang (+ / -) dengan proteksi batas stok.
   - Hapus item atau kosongkan keranjang belanja.
   - Kalkulasi otomatis subtotal dan total dalam format Rupiah (IDR).

4. **Checkout & Pembuatan Pesanan**
   - Formulir data pemesan: Nama, WhatsApp/HP, Alamat Lengkap, Kota/Kabupaten.
   - Opsi pengiriman: JNE, SiCepat, J&T, atau Ambil Langsung di Toko Mangga Dua.
   - Metode pembayaran: Transfer Bank BCA / Mandiri, QRIS, dan COD.
   - Otomatis membuat Kode Pesanan Unik resmi (contoh: `CPT-20261029-XXXX`).
   - Otomatis memotong stok inventaris saat pesanan terbit.

5. **Struk / Nota Pembelian (Printable Invoice)**
   - Rincian invoice resmi toko lengkap dengan data penerima dan rincian belanja.
   - Tombol cetak langsung ke printer atau simpan sebagai PDF (`window.print()`).
   - Tombol 1-klik konfirmasi pembayaran langsung ke WhatsApp admin.

6. **Panel Admin Toko**
   - Kredensial masuk: **Username:** `admin` | **Password:** `admin123`.
   - **Dashboard Ringkas:** Total sparepart, estimasi nilai inventaris (Rp), pesanan masuk, dan peringatan stok menipis.
   - **Kelola Produk (CRUD):** Tambah sparepart baru, ubah harga/stok, dan hapus/nonaktifkan produk.
   - **Kelola Pesanan:** Periksa rincian pemesan dan perbarui status transaksi (*Menunggu Konfirmasi*, *Diproses*, *Selesai*, *Dibatalkan*).
   - **Ekspor Skema Database:** Tombol unduh file `comptech_store.sql` untuk kebutuhan XAMPP / phpMyAdmin.

---

## 🗄️ Menjalankan di XAMPP Lokal

1. Salin seluruh isi folder proyek ke dalam direktori XAMPP:
   ```text
   C:\xampp\htdocs\comptech-store\
   ```
2. Jalankan **Apache** dan **MySQL** dari XAMPP Control Panel.
3. Buka browser dan akses **phpMyAdmin** (`http://localhost/phpmyadmin`).
4. Buat database baru dengan nama `comptech_store`.
5. Buka tab **Import**, pilih berkas `database/comptech_store.sql`, lalu klik **Go / Kirim**.
6. Buka website di browser melalui alamat:
   ```text
   http://localhost/comptech-store/
   ```

---

## 📂 Struktur Berkas

```text
comptech-store/
├── index.html                 # Struktur utama semantic HTML5
├── src/
│   ├── app.js                 # Logika JavaScript murni native (State, Cart, Checkout, Admin)
│   ├── style.css              # Gaya CSS3 native, responsive grid, tema obsidian slate
│   ├── data.js                # Data awal katalog sparepart & info toko
│   └── assets/
│       └── images/            # Foto studio asli komponen hardware (GPU, CPU, Mobo, RAM, SSD, dll)
├── database/
│   └── comptech_store.sql     # Skema tabel MySQL (categories, products, admins, orders, order_items)
└── README.md
```
