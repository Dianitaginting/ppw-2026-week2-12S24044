/**
 * Data Access Layer (DAL)
 * Bertanggung jawab menangani permintaan HTTP/Fetch API dan error handling
 */
class ApiService {
  /**
   * Mengambil koleksi data proyek dari provider JSON
   */
  static async fetchProjects() {
    try {
      const response = await fetch('./data/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[ApiService Error]: Gagal memuat data projects', error);
      throw error;
    }
  }

  /**
   * Mengambil katalog paket layanan dari provider JSON
   */
  static async fetchServices() {
    try {
      const response = await fetch('./data/services.json');
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[ApiService Error]: Gagal memuat data services', error);
      throw error;
    }
  }

  /**
   * Mengambil data profil/biodata dari provider JSON
   */
  static async fetchProfile() {
    try {
      const response = await fetch('./data/profile.json');
      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[ApiService Error]: Gagal memuat data profile', error);
      throw error;
    }
  }

  /**
   * Simulasi pengiriman data form layanan secara asinkron (REST Mock)
   */
  static async submitServiceOrder(payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 201,
          message: 'Permintaan layanan berhasil diproses oleh API Mock.',
          data: payload,
          timestamp: new Date().toISOString()
        });
      }, 1000);
    });
  }
}