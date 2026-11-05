# Panduan UI/UX — CompTech Store

## 1. Arah Desain
CompTech Store adalah website e-commerce untuk penjualan sparepart dan aksesori komputer. Tampilan harus modern, bersih, mudah dipahami, dan membantu pelanggan menemukan produk, membaca spesifikasi, memeriksa harga, lalu menyusun pesanan. Semua teks antarmuka menggunakan bahasa Indonesia.

- **Nama website:** CompTech Store
- **Subtitle:** Toko Aksesoris dan Sparepart Komputer
- **Jenis website:** E-commerce penjualan sparepart komputer
- **Mata uang:** Rupiah (IDR)

## 2. Token Visual Awal
Nilai berikut adalah rekomendasi awal dan dapat disesuaikan dengan identitas visual proyek.

| Elemen | Nilai/pedoman |
| --- | --- |
| Latar utama | `#F7F8FA` |
| Permukaan kartu | `#FFFFFF` |
| Teks utama | `#172033` |
| Teks sekunder | `#566174` |
| Warna utama | `#1D4ED8`, dengan teks putih setelah kontras diverifikasi |
| Aksen | `#F59E0B`, gunakan teks gelap bila aksen menjadi latar |
| Garis/border | `#E5E7EB` |
| Kesalahan | `#B42318`, selalu disertai teks yang menjelaskan masalah |
| Keberhasilan | `#166534`, tetap sertakan pesan teks |
| Font | `system-ui, sans-serif` |
| Teks dasar | 16 px, line-height 1.5–1.6 |
| Radius kartu | 12–16 px |
| Radius input/tombol | 8–10 px |
| Spasi | Kelipatan 4/8 px; jarak antarbagian 32–64 px |
| Lebar konten | Maksimum 1200 px; padding sisi minimal 16 px |

Periksa kontras warna pada keadaan normal, hover, fokus, dan disabled. Jangan menggunakan warna saja untuk menyampaikan status.

## 3. Susunan Halaman
### Beranda dan katalog
Header/nav → area pencarian → hero/pengantar toko → kategori produk → produk pilihan atau katalog → informasi layanan → FAQ/kontak → footer.

### Detail produk
Breadcrumb → foto produk → nama dan merek → harga → status stok → spesifikasi dan deskripsi → kontrol jumlah → tombol tambah ke keranjang.

### Keranjang dan checkout
Daftar produk dan jumlah → kontrol ubah/hapus → ringkasan subtotal dan total → formulir pemesan → alamat pengiriman jika tersedia → catatan → pemeriksaan akhir → tombol buat pesanan.

### Halaman admin
Login → dashboard → navigasi pengelolaan produk, kategori, stok, dan pesanan. Tampilan admin harus membedakan tindakan berisiko seperti menghapus atau menonaktifkan produk.

Pada desktop, katalog dapat menggunakan grid beberapa kolom dan ringkasan keranjang di sisi kanan bila ruang cukup. Pada ponsel, gunakan satu kolom dan letakkan ringkasan keranjang/checkout di bawah daftar item.

## 4. User Journey
| Tahap | Tujuan pengguna | Respons antarmuka |
| --- | --- | --- |
| Mengenal | Memahami toko dan jenis produk | Nama toko, deskripsi singkat, kategori, tombol “Lihat Produk” |
| Menemukan | Menemukan sparepart yang dibutuhkan | Pencarian, filter kategori/merek, foto, nama, harga |
| Membandingkan | Memastikan produk sesuai | Detail, spesifikasi, merek, dan informasi kompatibilitas jika tersedia |
| Menyusun | Memilih item dan jumlah | Tombol “Tambah ke Keranjang”, kontrol jumlah, indikator keranjang |
| Memeriksa | Memastikan rincian benar | Daftar item, harga satuan, subtotal, stok, total |
| Memesan | Mengirim data pesanan | Formulir berlabel, validasi, tombol “Buat Pesanan” |
| Menindaklanjuti | Mengetahui hasil pengajuan | Kode pesanan dan status yang benar-benar tersimpan; admin memproses pesanan |

Jika pembayaran online belum terintegrasi, jelaskan bahwa pembayaran dikonfirmasi manual. Jangan tampilkan “Pembayaran Berhasil” hanya karena tombol checkout ditekan.

## 5. Wireframe
### Desktop
```text
┌─────────────────────────────────────────────────────────────────┐
│ CompTech Store    Beranda  Produk  Tentang  Kontak   Keranjang   │
├─────────────────────────────────────────────────────────────────┤
│ Cari sparepart komputer...                         [Cari]        │
├─────────────────────────────────────────────────────────────────┤
│ Temukan Sparepart Komputer yang Tepat                            │
│ VGA, processor, RAM, SSD, PSU, dan aksesori komputer             │
│ [Lihat Produk]                                                   │
├─────────────────────────────────────────────────────────────────┤
│ Kategori: [VGA] [CPU] [RAM] [SSD] [PSU] [Lainnya]                │
├─────────────────────────────────────────────────────────────────┤
│ Produk Pilihan                                                   │
│ [Foto produk]    [Foto produk]    [Foto produk]    [Foto produk]│
│ Nama + harga     Nama + harga     Nama + harga     Nama + harga │
│ [Detail]         [Detail]         [Detail]         [Detail]     │
├─────────────────────────────────────────────────────────────────┤
│ Tentang toko | FAQ | Kontak | Kebijakan pemesanan                │
└─────────────────────────────────────────────────────────────────┘

Keranjang/checkout:
┌──────────────────────────────────┬──────────────────────────────┐
│ Produk, harga, dan jumlah        │ Ringkasan belanja            │
│ [Ubah jumlah] [Hapus]            │ Subtotal                     │
│ Formulir pemesan                 │ Total                        │
│ [Buat Pesanan]                   │                              │
└──────────────────────────────────┴──────────────────────────────┘
```

### Ponsel
```text
┌──────────────────────────────┐
│ CompTech Store    [Keranjang]│
│ [Cari sparepart...] [Cari]  │
│ Judul dan pengantar toko    │
│ [Lihat Produk]              │
│ Kategori [Pilih kategori ▼] │
│ [Kartu produk]              │
│ [Kartu produk]              │
│ Keranjang                   │
│ Item, jumlah, subtotal      │
│ Formulir checkout           │
│ Ringkasan dan total         │
│ [Buat Pesanan]              │
│ Kontak dan footer           │
└──────────────────────────────┘
```

## 6. Komponen dan Keadaan
- **Navigasi:** tautan menuju halaman yang benar, fokus keyboard terlihat, dan skip link menuju konten utama.
- **Kartu produk:** gambar, nama, merek bila tersedia, harga Rupiah, informasi stok yang akurat, dan tombol detail/tambah ke keranjang.
- **Pencarian/filter:** label jelas, filter kategori dan/atau merek, jumlah hasil, pesan hasil kosong, dan tombol reset.
- **Detail produk:** spesifikasi mudah dipindai, deskripsi, harga, status stok, dan kontrol jumlah.
- **Kontrol jumlah:** bilangan bulat positif; jumlah tidak boleh melebihi stok. Sediakan label untuk produk terkait.
- **Keranjang:** nama produk, harga satuan, jumlah, subtotal, tombol ubah/hapus, dan total keseluruhan.
- **Checkout:** label pada setiap input, penjelasan data wajib, ringkasan final, dan pesan validasi di dekat field.
- **Status pesanan:** tampilkan hanya status yang benar-benar tersimpan di database.
- **Admin:** tabel produk/pesanan mudah dibaca, tombol tambah/edit, serta konfirmasi sebelum penghapusan.
- **Pemberitahuan:** gunakan area status untuk keberhasilan/kegagalan; jangan merebut fokus tanpa kebutuhan.
- **FAQ:** gunakan elemen native `details` dan `summary` bila sesuai.
- **Gambar gagal dimuat:** tampilkan placeholder lokal yang rapi.

## 7. Contoh Microcopy
- Keranjang kosong: “Keranjang masih kosong. Temukan sparepart yang kamu butuhkan.”
- Hasil pencarian kosong: “Produk tidak ditemukan. Coba kata kunci lain atau reset filter.”
- Jumlah melebihi stok: “Jumlah yang dipilih melebihi stok yang tersedia.”
- Produk habis: “Stok produk sedang habis. Silakan pilih produk lain atau hubungi admin.”
- Data checkout salah: “Periksa kembali data yang ditandai sebelum melanjutkan.”
- Pesanan berhasil disimpan: “Pesanan berhasil dibuat dengan kode {kode_pesanan}. Admin akan menindaklanjuti sesuai prosedur toko.”
- Gagal menyimpan: “Pesanan belum berhasil disimpan. Periksa koneksi dan coba kembali.”
- Pembayaran manual: “Pesanan belum berarti pembayaran berhasil. Silakan ikuti instruksi konfirmasi pembayaran dari admin.”
- Aksi admin berhasil: “Perubahan berhasil disimpan.”
- Penghapusan: “Yakin ingin menghapus atau menonaktifkan produk ini?”

Sesuaikan pesan dengan hasil proses yang sebenarnya. Jangan menampilkan pesan sukses jika operasi database gagal.

## 8. Aksesibilitas
Target implementasi mengacu pada prinsip WCAG 2.2 tingkat AA; jangan mengklaim kepatuhan sebelum pemeriksaan.

- Gunakan `lang="id"`, landmark semantik, satu `h1` utama, dan urutan heading logis.
- Semua fungsi utama dapat digunakan dengan keyboard; jangan menjadikan `div` biasa sebagai tombol.
- Setiap input memiliki `label`; hubungkan error menggunakan `aria-describedby` dan gunakan `aria-invalid` saat sesuai.
- Setelah validasi gagal, arahkan fokus ke field salah pertama jika memungkinkan.
- Pembaruan keranjang dan status gunakan area `aria-live="polite"` secara hemat.
- Targetkan kontras teks normal minimal 4.5:1 dan teks besar 3:1; indikator fokus dan komponen interaktif juga perlu kontras memadai.
- Target area sentuh minimal 44 × 44 CSS px, fokus terlihat, dan tidak tertutup elemen sticky.
- Informasi tidak bergantung hanya pada warna atau hover.
- Gambar informatif memiliki teks alternatif; gambar dekoratif memakai `alt=""`.
- Dukung pembesaran teks dan zoom 200%; uji reflow hingga lebar 320 CSS px.
- Hormati `prefers-reduced-motion`.

## 9. Validasi Pengalaman
Uji skenario berikut pada desktop dan ponsel:
1. Mencari produk tersedia dan produk yang tidak ditemukan.
2. Memilih kategori dan mencari berdasarkan nama/merek.
3. Membuka detail produk dan membaca spesifikasi.
4. Menambahkan produk, mengubah jumlah, dan menghapus item.
5. Mencoba jumlah nol, jumlah melebihi stok, dan produk yang stoknya berubah.
6. Mengisi checkout dengan data valid dan tidak valid.
7. Memastikan total yang ditampilkan sesuai perhitungan server.
8. Memastikan pesanan tersimpan dan kode/status sesuai database.
9. Menguji login admin, proteksi halaman, dan pengelolaan produk/pesanan.
10. Mengulangi alur utama menggunakan keyboard dan memeriksa pesan kesalahan.

Catat hambatan pengguna uji dan perbaiki masalah utama sebelum website dipublikasikan.
