# Catatan Verifikasi — CompTech Store

Tanggal penyusunan: 25 Oktober 2026.  
Status: dokumen verifikasi awal untuk proyek **E-Commerce Penjualan Sparepart Komputer Berbasis Web** dengan nama website **CompTech Store**. Dokumen ini disesuaikan dari catatan verifikasi proyek Puncak Rental. Hasil pengujian Puncak Rental tidak dianggap sebagai hasil pengujian CompTech Store.

## 1. Ruang lingkup proyek

CompTech Store direncanakan sebagai website penjualan aksesoris dan sparepart komputer. Teknologi yang direncanakan:

- HTML untuk struktur halaman.
- CSS untuk tampilan dan tata letak.
- JavaScript untuk interaksi pada sisi pengguna.
- PHP untuk pemrosesan sisi server.
- MySQL sebagai basis data.
- XAMPP sebagai lingkungan pengembangan lokal, termasuk Apache dan MySQL/MariaDB.
- phpMyAdmin untuk membantu pengelolaan basis data selama pengembangan.

Fitur yang perlu diverifikasi mencakup katalog produk, pencarian dan filter, detail produk, keranjang, proses pemesanan, serta halaman admin untuk mengelola produk dan pesanan. Fitur yang belum benar-benar diimplementasikan harus ditandai belum tersedia, bukan dianggap lulus pengujian.

## 2. Status pemeriksaan

**Status saat dokumen ini dibuat: belum diverifikasi.**

Belum ada bukti pengujian CompTech Store yang disertakan bersama dokumen sumber. Karena itu, hasil pengujian Puncak Rental—termasuk tes otomatis, pemeriksaan sintaks JavaScript, smoke test Chrome, responsivitas, dan pemuatan gambar—tidak dapat dipindahkan sebagai hasil lulus untuk CompTech Store.

Setelah implementasi tersedia, catat hasil setiap pemeriksaan berikut sebagai **Lulus**, **Gagal**, **Belum diuji**, atau **Tidak berlaku**, disertai tanggal dan catatan.

## 3. Daftar pengujian yang perlu dilakukan

### 3.1 Katalog dan data produk

- [ ] Produk yang ditampilkan sesuai dengan data di basis data.
- [ ] Nama, kategori, harga, deskripsi, dan jumlah stok ditampilkan dengan benar.
- [ ] Pencarian produk bekerja berdasarkan kata kunci.
- [ ] Filter kategori dapat digunakan dan dapat direset.
- [ ] Kondisi katalog saat tidak ada produk ditangani dengan jelas.
- [ ] Produk dengan data atau gambar yang tidak tersedia tidak menyebabkan halaman rusak.

### 3.2 Keranjang belanja

- [ ] Pengguna dapat menambahkan produk ke keranjang.
- [ ] Menambahkan produk yang sama memperbarui jumlahnya dengan benar.
- [ ] Pengguna dapat mengubah jumlah dan menghapus produk.
- [ ] Jumlah tidak boleh kurang dari satu atau melebihi stok yang tersedia.
- [ ] Subtotal dan total dihitung dengan benar.
- [ ] Total dihitung ulang dan divalidasi di sisi server; nilai dari browser tidak dipercaya begitu saja.
- [ ] Keranjang menangani produk yang dihapus, stok berubah, atau harga berubah.

### 3.3 Pemesanan dan validasi

- [ ] Formulir pemesanan memvalidasi nama, kontak, dan data wajib lainnya.
- [ ] Pesanan tidak dapat dikirim jika keranjang kosong.
- [ ] Server memeriksa kembali harga, stok, dan jumlah sebelum menyimpan pesanan.
- [ ] Pesanan yang berhasil tersimpan memiliki nomor atau identitas pesanan yang konsisten.
- [ ] Kegagalan penyimpanan menampilkan pesan yang mudah dipahami dan tidak membuat pesanan ganda.
- [ ] Status pembayaran dan pengiriman hanya ditampilkan jika alur tersebut benar-benar diimplementasikan.
- [ ] Jika pembayaran online atau integrasi kurir belum dibuat, fitur tersebut dinyatakan belum tersedia.

### 3.4 Admin

- [ ] Halaman admin tidak dapat diakses tanpa autentikasi yang sesuai.
- [ ] Admin dapat menambah, melihat, mengubah, dan menghapus produk sesuai kebutuhan proyek.
- [ ] Input produk divalidasi di sisi server.
- [ ] Perubahan stok dan harga tersimpan di basis data.
- [ ] Admin dapat melihat dan memperbarui status pesanan jika fitur pengelolaan pesanan sudah tersedia.
- [ ] Kata sandi tidak disimpan sebagai teks biasa; gunakan mekanisme hashing yang sesuai.
- [ ] Sesi admin ditangani dengan aman dan proses logout mengakhiri sesi.

### 3.5 Basis data dan keamanan

- [ ] Koneksi PHP ke MySQL berjalan pada lingkungan XAMPP.
- [ ] Struktur tabel dan relasi sesuai dengan rancangan basis data.
- [ ] Operasi basis data menggunakan prepared statements atau mekanisme parameterisasi yang sesuai.
- [ ] Input pengguna divalidasi dan keluaran yang ditampilkan ke halaman di-escape dengan benar.
- [ ] Pesan kesalahan tidak membocorkan kata sandi, kredensial, atau detail internal server.
- [ ] Hak akses pengguna dan admin dibedakan sesuai rancangan.
- [ ] Data pesanan tetap konsisten ketika proses penyimpanan gagal; gunakan transaksi basis data jika diperlukan.

### 3.6 Tampilan dan aksesibilitas

- [ ] Halaman diuji pada lebar layar 320, 360, 768, dan 1280 piksel CSS.
- [ ] Tidak ada overflow horizontal yang tidak diinginkan.
- [ ] Navigasi, formulir, kartu produk, keranjang, dan halaman admin tetap dapat digunakan pada layar kecil.
- [ ] Semua kontrol penting dapat dioperasikan menggunakan keyboard.
- [ ] Fokus keyboard terlihat dan pesan validasi mudah dikenali.
- [ ] Gambar memiliki teks alternatif yang sesuai.
- [ ] Kontras teks dan latar belakang cukup terbaca.
- [ ] Uji screen reader, zoom browser 200%, dan audit WCAG formal dicatat terpisah jika dilakukan.

## 4. Cara menjalankan pengujian lokal

1. Instal dan jalankan XAMPP.
2. Aktifkan Apache dan MySQL dari XAMPP Control Panel.
3. Letakkan folder proyek di dalam direktori `C:\xampp\htdocs`, misalnya `C:\xampp\htdocs\comptech-store`.
4. Buat basis data CompTech Store melalui phpMyAdmin, lalu impor berkas SQL proyek jika tersedia.
5. Sesuaikan konfigurasi koneksi PHP dengan nama basis data dan akun lokal.
6. Buka `http://localhost/comptech-store/` di browser.
7. Jalankan setiap skenario pada bagian pengujian dan catat hasilnya.
8. Periksa Console dan Network pada Developer Tools browser, serta log PHP/Apache/MySQL bila terjadi kesalahan.
9. Gunakan data uji, bukan data pelanggan asli. Hapus atau reset data uji setelah pengujian bila diperlukan.

Perintah `npm test`, `node --check`, atau script smoke test browser dari proyek lain **tidak boleh diasumsikan tersedia**. Gunakan hanya jika CompTech Store memang memiliki konfigurasi dan script pengujian yang sesuai.

## 5. Ringkasan hasil pengujian

Isi tabel berikut setelah pengujian benar-benar dijalankan.

| Area | Status | Catatan / bukti |
|---|---|---|
| Katalog dan pencarian produk | Belum diuji | Isi setelah pengujian |
| Keranjang dan perhitungan total | Belum diuji | Isi setelah pengujian |
| Validasi dan penyimpanan pesanan | Belum diuji | Isi setelah pengujian |
| Login dan pengelolaan admin | Belum diuji | Isi setelah pengujian |
| Koneksi dan konsistensi basis data | Belum diuji | Isi setelah pengujian |
| Keamanan input dan sesi | Belum diuji | Isi setelah pengujian |
| Responsivitas berbagai ukuran layar | Belum diuji | Isi setelah pengujian |
| Keyboard dan aksesibilitas dasar | Belum diuji | Isi setelah pengujian |
| Pengujian browser | Belum diuji | Catat browser dan versinya |
| Pengujian penerapan/hosting | Belum diuji | Isi setelah hosting disiapkan |

## 6. Batas verifikasi dan kesiapan rilis

- Dokumen ini adalah rencana dan catatan verifikasi awal, bukan bukti bahwa website sudah lulus pengujian.
- Harga, spesifikasi, gambar, dan stok produk harus diverifikasi terhadap data toko yang sebenarnya sebelum website digunakan.
- Fitur yang belum diimplementasikan—misalnya pembayaran online, integrasi kurir, notifikasi otomatis, atau pelacakan pesanan—harus disebutkan secara terbuka dan tidak boleh digambarkan seolah-olah sudah berfungsi.
- Sebelum rilis, lakukan pengujian alur pengguna dari katalog sampai pemesanan, pengujian admin, pemeriksaan keamanan dasar, pencadangan basis data, dan pemeriksaan konfigurasi produksi.
- Jangan menggunakan kredensial pengembangan atau data pelanggan asli dalam pengujian publik.
- Status publikasi, alamat hosting, dan hasil uji produksi perlu ditambahkan setelah penerapan benar-benar dilakukan.

## 7. Catatan perubahan dari dokumen sumber

Dokumen sumber membahas Puncak Rental, aplikasi katalog rental statis, penyimpanan lokal, dan pengajuan melalui WhatsApp. Bagian tersebut telah disesuaikan untuk konteks toko sparepart komputer dan alur e-commerce berbasis PHP/MySQL. Angka hasil tes, status lulus, jumlah produk, hasil pengujian gambar, dan status paket dari Puncak Rental tidak dipertahankan sebagai fakta tentang CompTech Store karena belum ada bukti pengujian proyek CompTech Store yang mendukungnya.
