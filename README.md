# Refactoring Portofolio & Service Portal Berbasis Bootstrap 5.3

Dokumentasi refactoring Tugas Mandiri Minggu 3 mata kuliah Pemrograman dan Pengujian Web (12S3101).

## Informasi Pengembang
- **Nama:** Dianita Lorensia Br Ginting
- **NIM:** 12S24044
- **Program Studi:** S1 Sistem Informasi
- **Institut:** Institut Teknologi Del

---

## Tabel Komparasi: Sebelum vs Sesudah Integrasi Framework

| Aspek Evaluasi | Sebelum Integrasi (Minggu 2 - Pure CSS) | Sesudah Integrasi (Minggu 3 - Bootstrap 5.3) |
| :--- | :--- | :--- |
| **Sistem Layout & Grid** | Menggunakan CSS Grid & Flexbox manual via media query kustom di `style.css`. | Menggunakan sistem Grid 12-kolom responsif bawaan Bootstrap (`.container`, `.row`, `.col-lg-*`). |
| **Navigasi Mobile** | Menu navigasi vertikal standar tanpa efek collapsible. | Responsive Navbar dengan tombol *hamburger toggle* (`data-bs-toggle="collapse"`) tanpa error. |
| **Tampilan Portofolio** | Tabel data semantik biasa. | Grid kartu interaktif (`.card`) lengkap dengan **Modal Dialog** (`.modal`) untuk popup detail proyek. |
| **Formulir Layanan** | Kontrol input HTML5 standar. | Ditingkatkan dengan **Floating Labels** (`.form-floating`), Input Groups berikon, dan validasi visual (`.invalid-feedback`). |
| **Arsitektur CSS** | CSS murni terpisah tanpa framework. | Kompatibel dengan Bootstrap CDN dipadukan dengan **6+ variabel CSS (`:root`)** pada Custom Overrides. |

---

## Tautan Publikasi
- **Repositori GitHub:** [https://github.com/Dianitaginting/ppw-2026-week2-12S24044](https://github.com/Dianitaginting/ppw-2026-week2-12S24044)
- **Live Demo (GitHub Pages):** [https://Dianitaginting.github.io/ppw-2026-week2-12S24044/](https://Dianitaginting.github.io/ppw-2026-week2-12S24044/)