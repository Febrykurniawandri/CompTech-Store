# Instruction — Panduan Pembuatan Website CompTech Store

Gunakan dokumen ini sebagai instruksi utama saat membuat atau melanjutkan proyek **E-Commerce Penjualan Sparepart Komputer Berbasis Web** dengan nama website **CompTech Store**.

## Tujuan
Buat website toko sparepart komputer yang dapat dijalankan secara lokal menggunakan XAMPP. Website harus memiliki tampilan rapi, responsif, mudah dipahami pemula, dan memiliki alur pelanggan serta admin yang benar-benar berfungsi.

## Stack
- HTML, CSS, JavaScript
- PHP
- MySQL
- XAMPP dan phpMyAdmin

Jangan mengganti proyek menjadi website rental atau website statis saja. Gunakan PHP dan MySQL untuk menyimpan dan mengelola produk serta pesanan.

## Identitas tampilan
- Nama: **CompTech Store**
- Subtitle: **Toko Aksesoris dan Sparepart Komputer**
- Bahasa antarmuka: Bahasa Indonesia
- Mata uang: Rupiah (IDR)
- Tampilan: modern, bersih, terpusat, responsif, dengan kartu produk yang konsisten.
- Kategori contoh: VGA, CPU/processor, motherboard, RAM, SSD/HDD, PSU, casing, pendingin, monitor, keyboard, mouse, dan aksesori.

## Halaman minimum
1. Beranda/katalog.
2. Detail produk.
3. Keranjang belanja.
4. Checkout dan ringkasan pesanan.
5. Login admin.
6. Dashboard admin.
7. Kelola produk (tambah, tampil, edit, hapus/nonaktifkan).
8. Kelola kategori.
9. Kelola pesanan dan statusnya.

## Aturan implementasi
1. Sebelum menulis kode, periksa struktur folder dan file yang sudah ada. Pertahankan kode yang berfungsi dan hindari membuat file duplikat.
2. Berikan kode lengkap untuk setiap file yang dibuat atau diubah, serta sebutkan lokasi file secara eksplisit.
3. Jelaskan langkah pengerjaan secara berurutan dari awal untuk pemula: file mana yang dibuat, kode mana yang ditempel, database mana yang dibuat, dan cara menjalankannya.
4. Buat database `comptech_store` dan sertakan file SQL untuk tabel admin, kategori, produk, pesanan, serta detail pesanan.
5. Pisahkan koneksi database dan komponen tampilan agar tidak menyalin kode yang sama di banyak halaman.
6. Semua query dengan input pengguna harus menggunakan prepared statements.
7. Validasi input pada PHP; JavaScript hanya untuk membantu pengalaman pengguna.
8. Harga dan stok harus diambil dari database. Hitung ulang total checkout di PHP, bukan mempercayai total dari browser.
9. Gunakan `password_hash()` dan `password_verify()` untuk autentikasi admin. Lindungi halaman admin dengan session.
10. Escape teks keluaran dengan `htmlspecialchars()` dan tangani kegagalan secara aman.
11. Tombol dan menu harus memiliki fungsi nyata. Jangan membuat tombol dekoratif yang tidak bekerja.
12. Gunakan gambar produk lokal di `assets/images/products/`; jika gambar belum tersedia, tampilkan placeholder yang rapi dan jangan biarkan gambar rusak.
13. Pastikan halaman nyaman digunakan pada ponsel, tablet, dan desktop.
14. Jangan mengklaim pembayaran online, pengiriman otomatis, atau status transaksi berhasil jika fitur tersebut belum dibuat.
15. Gunakan data dummy yang jelas untuk demonstrasi dan jelaskan cara menggantinya.

## Urutan pengerjaan yang disarankan
1. Periksa/siapkan struktur folder proyek.
2. Buat database dan impor SQL.
3. Buat koneksi database PHP dan uji koneksi.
4. Buat header, navigasi, footer, dan CSS dasar.
5. Buat katalog yang mengambil produk dari MySQL.
6. Buat detail produk dan pencarian/filter.
7. Buat keranjang dan validasi jumlah.
8. Buat checkout yang menyimpan pesanan dan detail pesanan dengan transaksi database.
9. Buat login admin dan proteksi halaman admin.
10. Buat CRUD produk/kategori dan pengelolaan pesanan.
11. Uji semua alur, responsivitas, validasi, dan keamanan.
12. Buat README yang menjelaskan instalasi serta cara menjalankan website melalui XAMPP.

## Kriteria selesai
Website dianggap memenuhi versi awal jika pelanggan dapat melihat katalog, mencari produk, memasukkan produk ke keranjang, mengirim pesanan yang tersimpan ke database, dan admin dapat login serta mengelola produk dan pesanan. Semua langkah harus dapat dijalankan dari instruksi yang diberikan tanpa menebak lokasi file atau konfigurasi.
