# Refactoring Arsitektural Personal Portfolio & Service Portal: Decoupled Multi-Tier & Dynamic Client-Side Rendering (CSR)

Dokumentasi Tugas Mandiri Minggu 4 mata kuliah Pemrograman dan Pengujian Web (12S3101).

## Informasi Mahasiswa
- **Nama:** Dianita Lorensia Br Ginting
- **NIM:** 12S24044
- **Program Studi:** S1 Sistem Informasi
- **Institut:** Institut Teknologi Del

---

## 1. Pemodelan Arsitektur Sistem C4 Container Model

Aplikasi portofolio ini ditransformasi dari arsitektur monolitik statis menjadi **Decoupled Multi-Tier System** yang menerapkan prinsip pemisahan minat (*Separation of Concerns*).

```mermaid
C4Container
    title Container Diagram for Decoupled Personal Portfolio Application

    Person(user, "User / Browser Client", "Mahasiswa, Dosen, atau Klien Eksternal")

    System_Boundary(c1, "Client-Side Presentation Layer (Browser)") {
        Container(web_app, "Single Page Shell (HTML5/CSS3)", "Bootstrap 5.3, Custom CSS Variables", "Menyediakan kerangka tampilan web yang responsif")
        Container(app_js, "Presentation Controller (app.js)", "JavaScript ES6+", "Mengontrol manipulasi DOM, manajemen UI States, event handling, dan Universal Modal")
        Container(api_dal, "Data Access Layer (api-service.js)", "JavaScript Fetch API", "Menangani komunikasi HTTP asinkron dan defensive error handling")
        Container(local_storage, "Browser LocalStorage", "Client-Side Key-Value Store", "Menyimpan riwayat pemesanan layanan secara terdistribusi di sisi klien")
    }

    System_Boundary(c2, "Decoupled Static Server & Mock API Data Layer") {
        ContainerDb(json_data, "Modular JSON Providers", "JSON Files (projects.json, services.json)", "Penyedia data independen yang bertindak sebagai mock RESTful layer")
        Container(static_server, "GitHub Pages Edge CDN", "Web Host Provider", "Melayani berkas aset statis (HTML, CSS, JS, JSON) secara global")
    }

    Rel(user, web_app, "Mengakses dan berinteraksi via", "HTTPS")
    Rel(web_app, app_js, "Menginstansiasi dan mengeksekusi kontroler UI", "DOM Event")
    Rel(app_js, api_dal, "Meminta data proyek dan layanan via", "Async/Await Call")
    Rel(api_dal, json_data, "Mengambil data JSON mentah dari", "HTTP GET / Fetch")
    Rel(app_js, local_storage, "Membaca dan menulis riwayat pesanan ke", "Web Storage API")
    Rel(static_server, web_app, "Mengirimkan berkas statis ke", "HTTP/2")