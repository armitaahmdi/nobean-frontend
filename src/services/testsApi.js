import { apiRequest, apiRequestWithRetry } from './api.js';

// API URL configuration - use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api.nobean.ir';

// Tests API Service
export const testsApi = {
  // GET /v1/tests - دریافت همه تست‌ها
  getAllTests: async (token = null) => {
    const url = `${API_BASE_URL}/v1/tests`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // GET /v1/tests/{id} - دریافت جزئیات یک تست بر اساس شناسه
  getTestById: async (testId, token = null) => {
    const url = `${API_BASE_URL}/v1/tests/${testId}`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // GET /v1/tests/{id}/questions - دریافت تمام سوالات یک آزمون همراه با گزینه‌ها (فقط برای کاربران لاگین‌شده)
  getTestQuestions: async (testId, token) => {
    if (!token) {
      throw new Error('برای دریافت سوالات آزمون باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}/questions`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // POST /v1/tests - ایجاد یک تست جدید (فقط ادمین‌ها)
  createTest: async (testData, token) => {
    if (!token) {
      throw new Error('برای ایجاد تست باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests`;
    return await apiRequestWithRetry(url, {
      method: 'POST',
      body: testData,
      token,
    });
  },

  // PUT /v1/tests/{id} - ویرایش یک تست (فقط ادمین‌ها)
  updateTest: async (testId, testData, token) => {
    if (!token) {
      throw new Error('برای ویرایش تست باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}`;
    return await apiRequestWithRetry(url, {
      method: 'PUT',
      body: testData,
      token,
    });
  },

  // DELETE /v1/tests/{id} - حذف یک تست (فقط برای ادمین‌ها)
  deleteTest: async (testId, token) => {
    if (!token) {
      throw new Error('برای حذف تست باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}`;
    return await apiRequestWithRetry(url, {
      method: 'DELETE',
      token,
    });
  },

  // POST /v1/tests/{id}/questions - افزودن سوال جدید به یک تست خاص (فقط ادمین‌ها)
  addQuestionToTest: async (testId, questionData, token) => {
    if (!token) {
      throw new Error('برای افزودن سوال باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}/questions`;
    return await apiRequestWithRetry(url, {
      method: 'POST',
      body: questionData,
      token,
    });
  },

  // PUT /v1/tests/{id}/questions/{questionId} - ویرایش سوال (فقط ادمین‌ها)
  updateQuestion: async (testId, questionId, questionData, token) => {
    if (!token) {
      throw new Error('برای ویرایش سوال باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}/questions/${questionId}`;
    return await apiRequestWithRetry(url, {
      method: 'PUT',
      body: questionData,
      token,
    });
  },

  // DELETE /v1/tests/{id}/questions/{questionId} - حذف سوال (فقط ادمین‌ها)
  deleteQuestion: async (testId, questionId, token) => {
    if (!token) {
      throw new Error('برای حذف سوال باید وارد شوید');
    }
    const url = `${API_BASE_URL}/v1/tests/${testId}/questions/${questionId}`;
    return await apiRequestWithRetry(url, {
      method: 'DELETE',
      token,
    });
  },
};

export default testsApi;