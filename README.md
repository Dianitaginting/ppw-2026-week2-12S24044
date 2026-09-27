# Refactoring Portofolio & Portal Layanan Berbasis Bootstrap 5.3

Dokumentasi pembaruan Tugas Mandiri Minggu 3 mata kuliah Pemrograman dan Pengujian Web (12S3101).

## Informasi Mahasiswa
- **Nama:** Dianita Lorensia Br Ginting
- **NIM:** 12S24044
- **Program Studi:** S1 Sistem Informasi
- **Institut:** Institut Teknologi Del

---

## Tabel Komparasi: Sebelum vs Sesudah Integrasi Framework

| Aspek Evaluasi | Sebelum Integrasi (Minggu 2 - Pure CSS) | Sesudah Integrasi (Minggu 3 - Bootstrap 5.3) |
| :--- | :--- | :--- |
| **Sistem Layout & Grid** | Menggunakan CSS Grid & Flexbox manual via media query di `style.css`. | Menggunakan sistem Grid 12-kolom responsif bawaan Bootstrap (`.container`, `.row`, `.col-lg-*`). |
| **Navigasi Mobile** | Menu navigasi vertikal standar tanpa efek collapsible. | Responsive Navbar Sticky dengan tombol *hamburger toggle* (`data-bs-toggle="collapse"`) yang lancar di mobile. |
| **Tampilan Portofolio** | Tabel data semantik biasa. | Grid kartu interaktif (`.card`) dilengkapi dengan **Modal Dialog** (`.modal`) untuk rincian proyek. |
| **Formulir Layanan** | Kontrol input HTML5 standar. | Ditingkatkan dengan **Floating Labels** (`.form-floating`), Input Groups berikon, dan pesan validasi visual (`.invalid-feedback`). |
| **Arsitektur CSS** | CSS murni terpisah tanpa framework. | Terintegrasi dengan Bootstrap CDN dipadukan dengan **8 variabel CSS (`:root`)** pada Custom Overrides tanpa `!important`. |

---

## Tautan Publikasi
- **Repositori GitHub:** [https://github.com/Dianitaginting/ppw-2026-week2-12S24044](https://github.com/Dianitaginting/ppw-2026-week2-12S24044)
- **Live Demo (GitHub Pages):** [https://Dianitaginting.github.io/ppw-2026-week2-12S24044/](https://Dianitaginting.github.io/ppw-2026-week2-12S24044/)