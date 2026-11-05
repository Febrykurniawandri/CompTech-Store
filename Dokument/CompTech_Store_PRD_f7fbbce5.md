# Product Requirement Document — CompTech Store

**Nama proyek:** E-Commerce Penjualan Sparepart Komputer Berbasis Web  
**Nama website:** CompTech Store  
**Status dokumen:** Panduan kebutuhan produk untuk pengembangan website.  
**Catatan:** Nama toko, alamat, kontak, harga, foto, dan data produk pada tahap pengembangan merupakan contoh dan harus diganti dengan data yang benar sebelum website digunakan secara nyata.

## 1. Visi Produk

CompTech Store adalah website e-commerce yang membantu pelanggan mencari informasi, membandingkan, dan memesan sparepart serta aksesori komputer secara mudah. Website dirancang dengan bahasa Indonesia, tampilan responsif, navigasi sederhana, dan informasi produk yang jelas.

## 2. Masalah yang Dipecahkan

- Pelanggan kesulitan menemukan informasi spesifikasi dan harga sparepart komputer dari satu tempat.
- Pelanggan perlu mengetahui ketersediaan produk sebelum melakukan pemesanan.
- Informasi produk, jumlah barang, dan total belanja perlu ditampilkan secara terstruktur.
- Admin membutuhkan cara yang lebih rapi untuk mengelola data produk, kategori, harga, stok, dan pesanan.
- Pencatatan pesanan secara manual berisiko menimbulkan kesalahan jumlah atau total pembayaran.

## 3. Target Pengguna

| Pengguna | Kebutuhan utama |
| --- | --- |
| Pengunjung/pelanggan | Melihat katalog, mencari produk, membaca spesifikasi, dan memasukkan produk ke keranjang |
| Pelanggan yang memesan | Mengisi data pemesanan, memeriksa ringkasan, dan mengetahui status pesanan |
| Admin | Mengelola produk, kategori, harga, stok, dan pesanan |
| Pemilik/pengelola toko | Memantau katalog dan pesanan melalui data yang tercatat |

## 4. Ruang Lingkup MVP

### 4.1 Fitur pelanggan
1. **Beranda:** menampilkan identitas CompTech Store, menu navigasi, kolom pencarian, kategori utama, produk pilihan, serta informasi kontak.
2. **Katalog produk:** menampilkan foto, nama, kategori, harga, ringkasan spesifikasi, dan status stok.
3. **Pencarian dan filter:** mencari berdasarkan nama produk atau merek serta memfilter berdasarkan kategori.
4. **Detail produk:** menampilkan deskripsi, merek, spesifikasi, harga, stok, dan jumlah yang ingin dibeli.
5. **Keranjang belanja:** menambah produk, mengubah jumlah, menghapus produk, dan menghitung subtotal serta total.
6. **Checkout/pemesanan:** meminta data minimum yang diperlukan, misalnya nama, nomor kontak, alamat pengiriman jika pengiriman didukung, dan catatan pesanan.
7. **Ringkasan pesanan:** menampilkan daftar produk, jumlah, harga satuan, subtotal, biaya tambahan bila ada, dan total sebelum pesanan dikonfirmasi.
8. **Informasi toko:** menampilkan kontak, alamat atau wilayah layanan, jam operasional, FAQ, serta kebijakan pemesanan.
9. **Tampilan responsif:** halaman dapat digunakan pada ponsel, tablet, dan desktop.

### 4.2 Fitur admin
1. Login admin menggunakan autentikasi sisi server.
2. Dashboard ringkas yang menampilkan jumlah produk, produk dengan stok rendah, dan jumlah pesanan.
3. CRUD produk: menambah, melihat, mengubah, dan menghapus data produk.
4. Pengelolaan kategori produk.
5. Pengelolaan stok dan harga.
6. Melihat detail pesanan dan memperbarui status pesanan.
7. Validasi input dan pesan berhasil/gagal yang jelas.

### 4.3 Kategori awal
- VGA / kartu grafis
- Processor / CPU
- Motherboard
- RAM
- SSD dan HDD
- Power Supply (PSU)
- Casing komputer
- Pendingin komputer
- Monitor
- Keyboard dan mouse
- Aksesori komputer lainnya

Kategori dan produk dapat disesuaikan dengan kebutuhan tugas.

### 4.4 Di luar ruang lingkup awal
Fitur berikut tidak wajib untuk versi pertama kecuali diminta dalam tugas: payment gateway, pelacakan pengiriman otomatis, integrasi marketplace, chat langsung, ulasan pelanggan, kupon kompleks, notifikasi SMS, dan multi-gudang. Jika pembayaran belum terintegrasi, jangan menampilkan seolah-olah pembayaran online telah berhasil.

## 5. Teknologi yang Digunakan

- **HTML** untuk struktur halaman.
- **CSS** untuk tata letak dan tampilan.
- **JavaScript** untuk interaksi antarmuka seperti pencarian, kontrol jumlah, dan pembaruan keranjang.
- **PHP** untuk proses sisi server, validasi, autentikasi admin, dan komunikasi dengan database.
- **MySQL** untuk menyimpan produk, kategori, admin, pelanggan/pemesan, dan pesanan.
- **XAMPP** sebagai lingkungan pengembangan lokal.
- **phpMyAdmin** untuk membantu mengelola database selama pengembangan.

HTML dan CSS bukan bahasa pemrograman; keduanya digunakan bersama JavaScript, PHP, dan MySQL dalam pengembangan website ini.

## 6. Aturan Bisnis

- Mata uang menggunakan Rupiah (IDR), dengan tampilan seperti `Rp3.500.000`.
- Harga dan stok harus berasal dari database, bukan dipercaya dari nilai yang dikirim oleh browser.
- Jumlah pembelian harus berupa bilangan bulat positif dan tidak boleh melebihi stok yang tersedia.
- Subtotal produk = harga satuan × jumlah.
- Total pesanan = jumlah subtotal produk + biaya lain yang benar-benar diterapkan.
- Harga, subtotal, dan total dihitung ulang di sisi server ketika pesanan dibuat.
- Stok perlu diperiksa kembali saat pesanan diproses agar dua pesanan tidak menggunakan stok yang sama secara tidak sengaja.
- Status pesanan awal dapat berupa `Menunggu Konfirmasi`, kemudian disesuaikan menjadi `Diproses`, `Selesai`, atau `Dibatalkan`.
- Jangan mengurangi stok berkali-kali untuk pesanan yang sama. Tentukan satu tahap yang jelas untuk perubahan stok dan dokumentasikan aturannya.
- Jika belum ada payment gateway, pembayaran dan pengiriman dikonfirmasi secara manual oleh admin.
- Data contoh harus diberi label sebagai data dummy selama pengembangan.

## 7. Alur Utama

Pelanggan membuka beranda → melihat atau mencari katalog → membuka detail produk → memilih jumlah → menambahkan produk ke keranjang → memeriksa keranjang → mengisi data pemesanan → memeriksa ringkasan → mengirim pesanan → sistem menyimpan pesanan ke database → admin memeriksa dan memperbarui status pesanan.

Alur admin: admin membuka halaman login → sistem memvalidasi akun → admin membuka dashboard → mengelola produk/kategori/stok → memeriksa pesanan → memperbarui status pesanan.

## 8. Model Data Minimum

| Tabel | Isi utama |
| --- | --- |
| `admins` | ID admin, nama, email/username, password hash |
| `categories` | ID kategori, nama kategori, deskripsi |
| `products` | ID produk, kategori, nama, merek, deskripsi, spesifikasi, harga, stok, gambar, status aktif |
| `orders` | ID pesanan, kode pesanan, nama pemesan, kontak, alamat jika diperlukan, catatan, tanggal, status, total |
| `order_items` | ID detail, ID pesanan, ID produk, nama produk saat dipesan, harga saat dipesan, jumlah, subtotal |

Relasi minimum: satu kategori memiliki banyak produk; satu pesanan memiliki banyak detail pesanan; setiap detail pesanan merujuk pada produk. Simpan harga produk saat transaksi di `order_items` agar riwayat pesanan tidak berubah ketika harga katalog diperbarui.

## 9. Kriteria Penerimaan

- Katalog menampilkan produk dari database dan memberikan pesan yang jelas jika belum ada produk.
- Pencarian dan filter kategori dapat digunakan tanpa menyebabkan halaman rusak.
- Produk yang sama tidak dibuat sebagai baris keranjang terpisah jika aturan keranjang menggabungkannya.
- Jumlah nol, negatif, pecahan, atau melebihi stok ditolak.
- Harga dan total yang disimpan dihitung ulang oleh PHP berdasarkan data database.
- Checkout tidak dapat diproses jika keranjang kosong atau data wajib tidak valid.
- Pesanan yang berhasil dibuat memiliki kode pesanan dan rincian item yang benar.
- Admin yang belum login tidak dapat membuka halaman pengelolaan.
- Password admin tidak disimpan sebagai teks biasa.
- Formulir dan parameter URL divalidasi di sisi server.
- Website tidak mengalami gulir horizontal yang tidak diinginkan pada lebar layar 360 px.
- Tombol, tautan, formulir, dan pesan kesalahan dapat dipahami pengguna.

## 10. Keamanan dan Privasi

- Gunakan prepared statements/PDO atau MySQLi prepared statements untuk query database.
- Simpan password menggunakan `password_hash()` dan verifikasi dengan `password_verify()`.
- Gunakan session PHP untuk login admin dan regenerasi ID session setelah login berhasil.
- Validasi serta normalisasi input di sisi server; jangan hanya mengandalkan JavaScript.
- Escape teks keluaran HTML dengan `htmlspecialchars()` untuk mengurangi risiko XSS.
- Lindungi formulir perubahan data dan checkout dari CSRF bila sesi digunakan.
- Batasi tipe dan ukuran gambar yang diunggah; jangan menjalankan file unggahan sebagai kode.
- Jangan menyimpan data sensitif yang tidak dibutuhkan.
- Kredensial database tidak boleh diletakkan pada JavaScript atau repositori publik.

## 11. Metrik Keberhasilan

Target awal untuk pengujian, bukan hasil yang telah diukur:

| Metrik | Target awal | Cara ukur |
| --- | --- | --- |
| Katalog | Semua produk contoh tampil dengan data yang benar | Cocokkan halaman dengan database |
| Keranjang | Seluruh skenario tambah, ubah jumlah, dan hapus lolos | Uji kasus manual |
| Perhitungan | Semua skenario subtotal dan total menghasilkan nilai yang benar | Bandingkan dengan hitung manual |
| Checkout | Pesanan valid tersimpan lengkap | Uji dan periksa database |
| Admin | Pengguna tanpa sesi admin ditolak | Uji akses langsung ke URL admin |
| Responsif | Alur utama dapat digunakan pada 360, 768, dan 1280 px | Uji ukuran layar |

## 12. Risiko dan Dependensi

- Data harga dan stok harus diperbarui oleh admin.
- Foto produk harus sesuai dengan produk yang dijual dan memiliki izin penggunaan.
- Detail spesifikasi harus diperiksa agar tidak menyesatkan.
- Pembayaran dan pengiriman perlu dijelaskan secara transparan jika belum otomatis.
- Website lokal di XAMPP belum otomatis dapat diakses publik. Peluncuran online membutuhkan hosting yang mendukung PHP dan MySQL serta konfigurasi keamanan.
