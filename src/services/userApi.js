import { apiRequest, apiRequestWithRetry } from './api';
import { API_BASE_URL } from './apiConfig';

class UserApi {
  // لیست کاربران با pagination و جستجو
  async getUsers(params = {}, token = null) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/admin/users${queryString ? `?${queryString}` : ''}`;
      return await apiRequestWithRetry(url, {
        method: 'GET',
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // آمار کاربران
  async getUserStats(token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users/stats`;
      return await apiRequestWithRetry(url, {
        method: 'GET',
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // دریافت اطلاعات یک کاربر
  async getUser(id, token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users/${id}`;
      return await apiRequestWithRetry(url, {
        method: 'GET',
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // ایجاد کاربر جدید
  async createUser(userData, token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users`;
      return await apiRequestWithRetry(url, {
        method: 'POST',
        body: userData,
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // ویرایش کاربر
  async updateUser(id, userData, token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users/${id}`;
      return await apiRequestWithRetry(url, {
        method: 'PUT',
        body: userData,
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // حذف کاربر
  async deleteUser(id, token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users/${id}`;
      return await apiRequestWithRetry(url, {
        method: 'DELETE',
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  // تغییر وضعیت فعال/غیرفعال کاربر
  async toggleUserStatus(id, token = null) {
    try {
      const url = `${API_BASE_URL}/admin/users/${id}/toggle-status`;
      return await apiRequestWithRetry(url, {
        method: 'PATCH',
        token,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new UserApi();
