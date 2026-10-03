/**
 * Data Access Layer (DAL)
 * Bertanggung jawab menangani seluruh permintaan HTTP/Fetch API dan penanganan error
 */
class ApiService {
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

  static async submitServiceOrder(payload) {
    // Simulasi pengiriman REST API POST dengan latensi jaringan (1 detik)
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