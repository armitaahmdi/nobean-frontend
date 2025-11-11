import { apiRequest, apiRequestWithRetry } from './api.js';
import { API_BASE_URL } from './apiConfig.js';

// Dashboard API Service
export const dashboardApi = {
  // دریافت آمار کلی داشبورد
  getDashboardStats: async (token) => {
    if (!token) throw new Error('برای دریافت آمار داشبورد باید وارد شوید');
    
    try {
      // دریافت آمار کاربران
      const userStatsResponse = await apiRequestWithRetry(`${API_BASE_URL}/admin/users/stats`, {
        method: 'GET',
        token,
      });

      // دریافت آمار آزمون‌ها
      const testStatsResponse = await apiRequestWithRetry(`${API_BASE_URL}/tests`, {
        method: 'GET',
        token,
      });

      // دریافت آمار تلاش‌های آزمون
      const examAttemptsResponse = await apiRequestWithRetry(`${API_BASE_URL}/admin/tests/attempts/all`, {
        method: 'GET',
        token,
      });

      // ترکیب آمار
      const userStats = userStatsResponse.stats || {};
      console.log('User stats data:', userStats);
      const tests = testStatsResponse || [];
      console.log('Tests data:', tests);
      
      // محاسبه آمار آزمون‌ها
      const testStats = {
        total: tests.length,
        active: tests.filter(test => test.status === 'active').length,
        draft: tests.filter(test => test.status === 'draft').length,
        totalQuestions: tests.reduce((sum, test) => sum + (test.question_count || 0), 0),
        totalParticipants: tests.reduce((sum, test) => sum + (test.participantCount || 0), 0)
      };

      // آمار تلاش‌های آزمون
      const attempts = examAttemptsResponse.attempts || [];
      console.log('Exam attempts data:', attempts);
      const examAttemptsStats = {
        totalAttempts: attempts.length,
        completedAttempts: attempts.filter(attempt => attempt.status === 'completed').length,
        averageScore: attempts.length > 0 
          ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length)
          : 0
      };

      return {
        users: {
          total: userStats.total || 0,
          active: userStats.active || 0,
          inactive: userStats.inactive || 0,
          byRole: userStats.byRole || [],
          recent: userStats.recent || []
        },
        tests: testStats,
        examAttempts: examAttemptsStats,
        // آمار اضافی برای داشبورد
        coursesPurchased: 0, // TODO: پیاده‌سازی بعداً
        consultants: 0, // TODO: پیاده‌سازی بعداً
        successfulConsultations: 0, // TODO: پیاده‌سازی بعداً
        articles: 0, // TODO: پیاده‌سازی بعداً
        podcasts: 0, // TODO: پیاده‌سازی بعداً
        comments: 0 // TODO: پیاده‌سازی بعداً
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // دریافت آمار کاربران
  getUserStats: async (token) => {
    if (!token) throw new Error('برای دریافت آمار کاربران باید وارد شوید');
    
    const url = `${API_BASE_URL}/admin/users/stats`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // دریافت آمار آزمون‌ها
  getTestStats: async (token) => {
    if (!token) throw new Error('برای دریافت آمار آزمون‌ها باید وارد شوید');
    
    const url = `${API_BASE_URL}/tests`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // دریافت آمار تلاش‌های آزمون
  getExamAttemptsStats: async (token, params = {}) => {
    if (!token) throw new Error('برای دریافت آمار تلاش‌های آزمون باید وارد شوید');
    
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/admin/tests/attempts/all${queryString ? `?${queryString}` : ''}`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // دریافت آمار یک آزمون خاص
  getExamStatistics: async (examId, token) => {
    if (!token) throw new Error('برای دریافت آمار آزمون باید وارد شوید');
    
    const url = `${API_BASE_URL}/tests/${examId}/statistics`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // دریافت نتایج یک آزمون خاص
  getExamResults: async (examId, token, params = {}) => {
    if (!token) throw new Error('برای دریافت نتایج آزمون باید وارد شوید');
    
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/tests/${examId}/results${queryString ? `?${queryString}` : ''}`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // دریافت لیست کاربران اخیر
  getRecentUsers: async (token, limit = 5) => {
    if (!token) throw new Error('برای دریافت لیست کاربران باید وارد شوید');
    
    const url = `${API_BASE_URL}/admin/users/stats`;
    console.log('Fetching recent users from:', url);
    const response = await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
    console.log('Recent users response:', response);
    
    // برگرداندن فقط کاربران اخیر
    return {
      users: response.stats?.recent || []
    };
  },

  // دریافت فعالیت‌های اخیر (آخرین تلاش‌های آزمون)
  getRecentActivities: async (token, limit = 10) => {
    if (!token) throw new Error('برای دریافت فعالیت‌های اخیر باید وارد شوید');
    
    const url = `${API_BASE_URL}/admin/tests/attempts/all?limit=${limit}&sort=completedAt&order=desc`;
    console.log('Fetching recent activities from:', url);
    const response = await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
    console.log('Recent activities response:', response);
    return response;
  },

  // دریافت کامنت‌های جدید
  getRecentComments: async (token, params = {}) => {
    if (!token) throw new Error('برای دریافت کامنت‌های جدید باید وارد شوید');
    
    const { limit = 20, days = 7 } = params;
    const queryString = new URLSearchParams({ limit, days }).toString();
    const url = `${API_BASE_URL}/comments/admin/recent${queryString ? `?${queryString}` : ''}`;
    
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  }
};

export default dashboardApi;
