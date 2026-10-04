/**
 * Presentation Layer
 * Kontrol DOM, Dynamic Rendering, UI States, Filter Kategori, Universal Modal, & Badge Order Reaktif
 */
class App {
  constructor() {
    this.state = {
      projects: [],
      services: [],
      activeFilter: 'all'
    };
    this.init();
  }

  async init() {
    this.renderLoadingState();
    try {
      const [projects, services] = await Promise.all([
        ApiService.fetchProjects(),
        ApiService.fetchServices()
      ]);
      this.state.projects = projects;
      this.state.services = services;

      this.renderFilterButtons();
      this.renderProjects(this.state.projects);
      this.renderServiceOptions(this.state.services);
      this.updateOrderBadge();
    } catch (error) {
      this.renderErrorState('Gagal memuat data portofolio dari server. Silakan coba muat ulang halaman.');
    }

    this.bindEvents();
  }

  renderLoadingState() {
    const container = document.getElementById('projectGridContainer');
    if (!container) return;
    
    container.innerHTML = Array(4).fill(0).map(() => `
      <div class="col">
        <div class="card h-100 border shadow-sm p-3">
          <div class="placeholder-glow">
            <div class="placeholder col-12 mb-3 rounded" style="height: 40px;"></div>
            <div class="placeholder col-8 mb-2"></div>
            <div class="placeholder col-10 mb-2"></div>
            <div class="placeholder col-6"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderErrorState(message) {
    const container = document.getElementById('projectGridContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <i class="bi bi-exclamation-triangle-fill fs-4"></i>
          <div>${this.escapeHTML(message)}</div>
        </div>
      </div>
    `;
  }

  renderFilterButtons() {
    const categories = ['all', ...new Set(this.state.projects.map(p => p.category))];
    const filterContainer = document.getElementById('projectFilterContainer');
    if (!filterContainer) return;

    filterContainer.innerHTML = categories.map(cat => `
      <button type="button" class="btn btn-sm ${cat === this.state.activeFilter ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-3 me-2 mb-2 btn-filter" data-category="${cat}">
        ${cat === 'all' ? 'Semua Proyek' : this.escapeHTML(cat)}
      </button>
    `).join('');
  }

  renderProjects(projects) {
    const container = document.getElementById('projectGridContainer');
    if (!container) return;

    const filtered = this.state.activeFilter === 'all' 
      ? projects 
      : projects.filter(p => p.category === this.state.activeFilter);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted py-5">
          <i class="bi bi-inbox fs-1 d-block mb-2"></i>
          <p class="mb-0">Tidak ada proyek ditemukan untuk kategori "<strong>${this.escapeHTML(this.state.activeFilter)}</strong>".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(proj => `
      <div class="col">
        <div class="card h-100 project-card-pro border">
          <div class="project-header p-3 ${proj.badgeClass} text-white d-flex justify-content-between align-items-center">
            <span class="badge bg-white text-dark fw-bold">${this.escapeHTML(proj.category)}</span>
            <i class="bi ${proj.icon} fs-5"></i>
          </div>
          <div class="card-body p-4">
            <h3 class="h5 fw-bold text-dark mb-2">${this.escapeHTML(proj.title)}</h3>
            <p class="text-muted small mb-3">${this.escapeHTML(proj.summary)}</p>
            <div class="d-flex flex-wrap gap-1 mb-2">
              ${proj.tags.map(tag => `<span class="tag-badge">${this.escapeHTML(tag)}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 px-4 pb-4 pt-0">
            <button type="button" class="btn btn-outline-primary btn-sm w-100 fw-bold rounded-2 btn-open-modal" data-project-id="${proj.id}">
              <i class="bi bi-arrow-up-right-circle me-1"></i> Rincian Proyek
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderServiceOptions(services) {
    const selectEl = document.getElementById('floatingSelect');
    if (!selectEl) return;

    selectEl.innerHTML = `
      <option value="" selected disabled>-- Pilih Kategori Layanan --</option>
      ${services.map(svc => `<option value="${svc.id}">${this.escapeHTML(svc.name)}</option>`).join('')}
    `;
  }

  openProjectModal(projectId) {
    const proj = this.state.projects.find(p => p.id === projectId);
    if (!proj) return;

    document.getElementById('projectModalTitle').textContent = proj.title;
    document.getElementById('projectModalBody').innerHTML = `
      <div class="mb-3">
        <span class="badge ${proj.badgeClass} text-white px-3 py-2 rounded-pill">${this.escapeHTML(proj.category)}</span>
      </div>
      <p class="text-muted small mb-3">${this.escapeHTML(proj.description)}</p>
      <ul class="list-unstyled small text-secondary mb-0">
        <li class="mb-2"><strong>Peran Utama:</strong> ${this.escapeHTML(proj.role)}</li>
        <li class="mb-2"><strong>Tools:</strong> ${this.escapeHTML(proj.tools)}</li>
        <li><strong>Fitur Kunci:</strong> ${this.escapeHTML(proj.keyFeatures)}</li>
      </ul>
    `;

    const modalEl = document.getElementById('universalProjectModal');
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  bindEvents() {
    // Filter Kategori
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-filter');
      if (btn) {
        this.state.activeFilter = btn.getAttribute('data-category');
        this.renderFilterButtons();
        this.renderProjects(this.state.projects);
      }
    });

    // Modal Opener
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-open-modal');
      if (btn) {
        const projId = btn.getAttribute('data-project-id');
        this.openProjectModal(projId);
      }
    });

    // Form Submit Asinkron
    const form = document.querySelector('.needs-validation');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
          e.stopPropagation();
          form.classList.add('was-validated');
          return;
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

        try {
          await ApiService.submitServiceOrder(payload);
          this.saveOrderToLocalStorage(payload);
          this.updateOrderBadge();
          this.showToastNotification('Sukses!', 'Permintaan layanan berhasil diproses dan disimpan.');
          form.reset();
          form.classList.remove('was-validated');
        } catch (err) {
          this.showToastNotification('Gagal!', 'Terjadi kesalahan saat mengirim form.', 'danger');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-paperplane-fill me-2"></i>Kirim Pesan Konsultasi';
        }
      });
    }
  }

  saveOrderToLocalStorage(payload) {
    const history = JSON.parse(localStorage.getItem('service_orders') || '[]');
    history.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem('service_orders', JSON.stringify(history));
  }

  updateOrderBadge() {
    const history = JSON.parse(localStorage.getItem('service_orders') || '[]');
    const badgeEl = document.getElementById('orderCountBadge');
    if (badgeEl) {
      badgeEl.textContent = `${history.length} Pesanan Tersimpan`;
    }
  }

  showToastNotification(title, message, type = 'success') {
    const toastEl = document.getElementById('appToast');
    if (!toastEl) return;

    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastBody').textContent = message;
    
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    bootstrap.Toast.getOrCreateInstance(toastEl).show();
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});