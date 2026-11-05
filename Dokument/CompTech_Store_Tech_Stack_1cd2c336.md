# Teknologi — CompTech Store

## 1. Prinsip Pemilihan
Website **CompTech Store — E-Commerce Penjualan Sparepart Komputer Berbasis Web** dirancang untuk menampilkan katalog, menyediakan keranjang belanja, memproses pesanan, serta membantu admin mengelola produk dan pesanan. Teknologi dipilih agar mudah dipelajari dan dapat dikembangkan menggunakan XAMPP di komputer lokal.

## 2. Stack yang Dipilih
| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Struktur halaman | HTML5 semantik | Menyusun halaman dan formulir dengan struktur jelas serta mendukung aksesibilitas |
| Tampilan | CSS3, Flexbox, Grid, media query | Membuat katalog dan halaman responsif tanpa framework UI |
| Interaksi browser | JavaScript | Mendukung pencarian/filter, kontrol jumlah, dan pembaruan tampilan keranjang |
| Backend | PHP | Memproses formulir, validasi server, login admin, pengelolaan produk, dan checkout |
| Database | MySQL | Menyimpan kategori, produk, stok, admin, pesanan, dan detail pesanan |
| Lingkungan lokal | XAMPP (Apache dan MySQL) | Menjalankan website PHP dan database selama pengembangan |
| Pengelolaan database lokal | phpMyAdmin | Membuat database, menjalankan SQL, dan memeriksa tabel |
| Katalog | Tabel `products` dan `categories` di MySQL | Produk dapat dikelola admin tanpa mengubah array JavaScript |
| Keranjang | Session PHP; JavaScript untuk interaksi | Keranjang diproses server; browser bukan sumber kebenaran harga atau stok |
| Penyimpanan transaksi | MySQL melalui PHP | Menyimpan pesanan dan rincian item untuk diperiksa admin |
| Kontrol versi | Git (disarankan) | Melacak perubahan kode dan memudahkan pemulihan versi |
| Server pengembangan | Apache melalui XAMPP | Menjalankan PHP melalui HTTP di komputer lokal |
| Pemeriksaan | Browser DevTools dan pengujian manual | Memeriksa tampilan, responsivitas, validasi, dan kesalahan |

## 3. Kompatibilitas
Targetkan browser modern seperti Chrome, Edge, Firefox, dan Safari pada desktop maupun perangkat seluler yang masih didukung. Gunakan HTML semantik, label untuk semua input, dan validasi sisi server. Uji setidaknya satu browser berbasis Chromium serta satu browser lain jika tersedia. Internet Explorer tidak menjadi target.

## 4. Pengelolaan Data
- MySQL menjadi sumber utama data kategori, produk, harga, dan stok.
- Keranjang dapat disimpan pada session PHP. Jika `localStorage` digunakan, isinya tetap divalidasi dan tidak dipercaya untuk menentukan harga atau total pesanan.
- Kumpulkan nama pemesan dan kontak hanya jika diperlukan untuk pemesanan.
- Harga, stok, dan total harus diperiksa serta dihitung ulang oleh PHP saat checkout.
- Gunakan prepared statements untuk query yang menerima input pengguna.
- Password admin disimpan sebagai hash menggunakan `password_hash()` dan diverifikasi dengan `password_verify()`.
- Jangan meletakkan password database, token, atau kredensial rahasia dalam JavaScript maupun repositori publik.

## 5. Aset dan Performa
Gunakan gambar produk lokal yang sesuai dan memiliki hak penggunaan yang jelas. Simpan gambar pada `assets/images/products/`, gunakan nama file konsisten, tentukan dimensi gambar, dan gunakan `loading="lazy"` untuk gambar di bawah area awal. Gunakan font sistem bila tidak memerlukan font eksternal. Optimalkan ukuran gambar dan sediakan placeholder jika gambar gagal dimuat.

## 6. Pengembangan dan Deployment
### Pengembangan lokal
1. Instal XAMPP.
2. Letakkan folder proyek di `htdocs/comptech-store/`.
3. Jalankan Apache dan MySQL.
4. Buat database `comptech_store` melalui phpMyAdmin.
5. Impor struktur dan data awal dari file SQL.
6. Sesuaikan konfigurasi koneksi PHP untuk lingkungan lokal.
7. Buka `http://localhost/comptech-store/` dan uji halaman pelanggan serta admin.

### Deployment
Untuk akses publik, gunakan hosting yang mendukung PHP dan MySQL. Konfigurasikan HTTPS, kredensial database, backup database, dan izin file secara aman. Website yang berjalan di localhost belum berarti telah dipublikasikan. Uji checkout, pengelolaan stok, login admin, dan tampilan responsif sebelum rilis.

## 7. Batasan dan Pengembangan Berikutnya
Pembayaran online otomatis, pelacakan pengiriman, integrasi marketplace, notifikasi, dan akun pelanggan tidak dianggap tersedia kecuali benar-benar diimplementasikan dan diuji. Jangan mengklaim transaksi atau pembayaran berhasil sebelum sistem menerima konfirmasi yang sah.
