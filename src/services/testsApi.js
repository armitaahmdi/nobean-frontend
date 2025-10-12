// import { apiRequest, apiRequestWithRetry } from './api.js';

// // API URL configuration - use proxy in development, direct URL in production
// const API_BASE_URL = 'https://api.nobean.ir/api/v1';

// // Tests API Service
// export const testsApi = {
//   // GET /v1/tests - دریافت همه تست‌ها
//   getAllTests: async (token = null) => {
//     const url = `${API_BASE_URL}/tests`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },

//   // GET /v1/tests/{id} - دریافت جزئیات یک تست بر اساس شناسه
//   getTestById: async (testId, token = null) => {
//     const url = `${API_BASE_URL}/tests/${testId}`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },

//   // GET /v1/tests/{id}/questions - دریافت تمام سوالات یک آزمون همراه با گزینه‌ها (فقط برای کاربران لاگین‌شده)
//   getTestQuestions: async (testId, token) => {
//     if (!token) {
//       throw new Error('برای دریافت سوالات آزمون باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/questions`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },

//   // POST /v1/tests - ایجاد یک تست جدید (فقط ادمین‌ها)
//   createTest: async (testData, token) => {
//     if (!token) {
//       throw new Error('برای ایجاد تست باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests`;
//     return await apiRequestWithRetry(url, {
//       method: 'POST',
//       body: testData,
//       token,
//     });
//   },

//   // PUT /v1/tests/{id} - ویرایش یک تست (فقط ادمین‌ها)
//   updateTest: async (testId, testData, token) => {
//     if (!token) {
//       throw new Error('برای ویرایش تست باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}`;
//     return await apiRequestWithRetry(url, {
//       method: 'PUT',
//       body: testData,
//       token,
//     });
//   },

//   // DELETE /v1/tests/{id} - حذف یک تست (فقط برای ادمین‌ها)
//   deleteTest: async (testId, token) => {
//     if (!token) {
//       throw new Error('برای حذف تست باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}`;
//     return await apiRequestWithRetry(url, {
//       method: 'DELETE',
//       token,
//     });
//   },

//   // POST /v1/tests/{id}/questions - افزودن سوال جدید به یک تست خاص (فقط ادمین‌ها)
//   addQuestionToTest: async (testId, questionData, token) => {
//     if (!token) {
//       throw new Error('برای افزودن سوال باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/questions`;
//     return await apiRequestWithRetry(url, {
//       method: 'POST',
//       body: questionData,
//       token,
//     });
//   },

//   // PUT /v1/tests/{id}/questions/{questionId} - ویرایش سوال (فقط ادمین‌ها)
//   updateQuestion: async (testId, questionId, questionData, token) => {
//     if (!token) {
//       throw new Error('برای ویرایش سوال باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/questions/${questionId}`;
//     return await apiRequestWithRetry(url, {
//       method: 'PUT',
//       body: questionData,
//       token,
//     });
//   },

//   // DELETE /v1/tests/{id}/questions/{questionId} - حذف سوال (فقط ادمین‌ها)
//   deleteQuestion: async (testId, questionId, token) => {
//     if (!token) {
//       throw new Error('برای حذف سوال باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/questions/${questionId}`;
//     return await apiRequestWithRetry(url, {
//       method: 'DELETE',
//       token,
//     });
//   },

//   // POST /v1/tests/{id}/submit - ارسال پاسخ‌های آزمون (فقط کاربران لاگین‌شده)
//   submitExam: async (testId, examData, token) => {
//     if (!token) {
//       throw new Error('برای ارسال آزمون باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/submit`;
//     return await apiRequestWithRetry(url, {
//       method: 'POST',
//       body: examData,
//       token,
//     });
//   },

//   // GET /v1/tests/{id}/result - دریافت نتیجه آزمون کاربر (فقط کاربران لاگین‌شده)
//   getExamResult: async (testId, token) => {
//     if (!token) {
//       throw new Error('برای دریافت نتیجه آزمون باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/result`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },

//   // GET /v1/tests/{id}/results - دریافت تمام نتایج آزمون برای پنل ادمین
//   getExamResults: async (testId, token, params = {}) => {
//     if (!token) {
//       throw new Error('برای دریافت نتایج آزمون باید وارد شوید');
//     }
//     const queryParams = new URLSearchParams(params);
//     const url = `${API_BASE_URL}/tests/${testId}/results?${queryParams}`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },

//   // GET /v1/tests/{id}/statistics - دریافت آمار کلی آزمون
//   getExamStatistics: async (testId, token) => {
//     if (!token) {
//       throw new Error('برای دریافت آمار آزمون باید وارد شوید');
//     }
//     const url = `${API_BASE_URL}/tests/${testId}/statistics`;
//     return await apiRequestWithRetry(url, {
//       method: 'GET',
//       token,
//     });
//   },
// };

// export default testsApi;

import { apiRequest, apiRequestWithRetry } from './api.js';
import { API_BASE_URL } from './apiConfig.js';

// Tests API Service
export const testsApi = {
  // GET /v1/tests - دریافت همه تست‌ها
  getAllTests: async (token = null) => {
    const url = `${API_BASE_URL}/tests`;
    return await apiRequestWithRetry(url, {
      method: 'GET',
      token,
    });
  },

  // GET /v1/tests/{id} - دریافت جزئیات یک تست
  getTestById: async (testId, token = null) => {
    const url = `${API_BASE_URL}/tests/${testId}`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // GET /v1/tests/{id}/questions - دریافت سوالات آزمون (فقط کاربر لاگین‌شده)
  getTestQuestions: async (testId, token) => {
    if (!token) throw new Error('برای دریافت سوالات آزمون باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/questions`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // POST /v1/tests - ایجاد تست جدید (ادمین)
  createTest: async (testData, token) => {
    if (!token) throw new Error('برای ایجاد تست باید وارد شوید');
    const url = `${API_BASE_URL}/tests`;
    return await apiRequestWithRetry(url, { method: 'POST', body: testData, token });
  },

  // PUT /v1/tests/{id} - ویرایش تست
  updateTest: async (testId, testData, token) => {
    if (!token) throw new Error('برای ویرایش تست باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}`;
    return await apiRequestWithRetry(url, { method: 'PUT', body: testData, token });
  },

  // DELETE /v1/tests/{id} - حذف تست
  deleteTest: async (testId, token) => {
    if (!token) throw new Error('برای حذف تست باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}`;
    return await apiRequestWithRetry(url, { method: 'DELETE', token });
  },

  // POST /v1/tests/{id}/questions - افزودن سوال به تست
  addQuestionToTest: async (testId, questionData, token) => {
    if (!token) throw new Error('برای افزودن سوال باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/questions`;
    return await apiRequestWithRetry(url, { method: 'POST', body: questionData, token });
  },

  // PUT /v1/tests/{id}/questions/{questionId} - ویرایش سوال
  updateQuestion: async (testId, questionId, questionData, token) => {
    if (!token) throw new Error('برای ویرایش سوال باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/questions/${questionId}`;
    return await apiRequestWithRetry(url, { method: 'PUT', body: questionData, token });
  },

  // DELETE /v1/tests/{id}/questions/{questionId} - حذف سوال
  deleteQuestion: async (testId, questionId, token) => {
    if (!token) throw new Error('برای حذف سوال باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/questions/${questionId}`;
    return await apiRequestWithRetry(url, { method: 'DELETE', token });
  },

  // POST /v1/tests/{id}/submit - ارسال پاسخ آزمون
  submitExam: async (testId, examData, token) => {
    if (!token) throw new Error('برای ارسال آزمون باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/submit`;
    return await apiRequestWithRetry(url, { method: 'POST', body: examData, token });
  },

  // GET /v1/tests/{id}/result - دریافت نتیجه آزمون
  getExamResult: async (testId, token) => {
    if (!token) throw new Error('برای دریافت نتیجه آزمون باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/result`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // GET /v1/tests/{id}/results - دریافت همه نتایج (ادمین)
  getExamResults: async (testId, token, params = {}) => {
    if (!token) throw new Error('برای دریافت نتایج آزمون باید وارد شوید');
    const queryParams = new URLSearchParams(params);
    const url = `${API_BASE_URL}/tests/${testId}/results?${queryParams}`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // GET /v1/tests/{id}/statistics - آمار آزمون
  getExamStatistics: async (testId, token) => {
    if (!token) throw new Error('برای دریافت آمار آزمون باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/statistics`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // GET /v1/tests/attempts/all - دریافت همه تلاش‌های آزمون (ادمین)
  getAllExamAttempts: async (token, params = {}) => {
    if (!token) throw new Error('برای دریافت لیست تلاش‌ها باید وارد شوید');
    const queryParams = new URLSearchParams(params);
    const url = `${API_BASE_URL}/tests/attempts/all?${queryParams}`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // PATCH /v1/tests/{id}/status - تغییر وضعیت آزمون (ادمین)
  updateTestStatus: async (testId, status, token) => {
    if (!token) throw new Error('برای تغییر وضعیت آزمون باید وارد شوید');
    const url = `${API_BASE_URL}/tests/${testId}/status`;
    return await apiRequestWithRetry(url, { 
      method: 'PATCH', 
      token,
      body: { status }
    });
  },

  // GET /v1/tests/active/list - دریافت آزمون‌های فعال برای کاربران
  getActiveTests: async () => {
    const url = `${API_BASE_URL}/tests/active/list`;
    return await apiRequestWithRetry(url, { method: 'GET' });
  },

  // GET /v1/tests/my - دریافت آزمون‌های کاربر جاری به همراه خلاصه تلاش‌ها
  getMyExams: async (token) => {
    if (!token) throw new Error('برای دریافت آزمون‌های من باید وارد شوید');
    const url = `${API_BASE_URL}/tests/my`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // GET /v1/tests/my/attempts - دریافت لیست تمام تلاش‌های کاربر با جزئیات آزمون
  getMyAttempts: async (token, params = {}) => {
    if (!token) throw new Error('برای دریافت تلاش‌ها باید وارد شوید');
    const queryParams = new URLSearchParams(params);
    const url = `${API_BASE_URL}/tests/my/attempts?${queryParams}`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },

  // Domains (حیطه‌ها)
  createDomain: async (payload, token) => {
    if (!token) throw new Error('برای ایجاد حیطه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/domains`;
    return await apiRequestWithRetry(url, { method: 'POST', body: payload, token });
  },
  getDomains: async (examId, token) => {
    if (!token) throw new Error('برای دریافت حیطه‌ها باید وارد شوید');
    const url = `${API_BASE_URL}/tests/exams/${examId}/domains`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },
  updateDomain: async (id, payload, token) => {
    if (!token) throw new Error('برای ویرایش حیطه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/domains/${id}`;
    return await apiRequestWithRetry(url, { method: 'PUT', body: payload, token });
  },
  deleteDomain: async (id, token) => {
    if (!token) throw new Error('برای حذف حیطه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/domains/${id}`;
    return await apiRequestWithRetry(url, { method: 'DELETE', token });
  },

  // Components (مولفه‌ها)
  createComponent: async (payload, token) => {
    if (!token) throw new Error('برای ایجاد مولفه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/components`;
    return await apiRequestWithRetry(url, { method: 'POST', body: payload, token });
  },
  getComponents: async (domainId, token) => {
    if (!token) throw new Error('برای دریافت مولفه‌ها باید وارد شوید');
    const url = `${API_BASE_URL}/tests/domains/${domainId}/components`;
    return await apiRequestWithRetry(url, { method: 'GET', token });
  },
  updateComponent: async (id, payload, token) => {
    if (!token) throw new Error('برای ویرایش مولفه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/components/${id}`;
    return await apiRequestWithRetry(url, { method: 'PUT', body: payload, token });
  },
  deleteComponent: async (id, token) => {
    if (!token) throw new Error('برای حذف مولفه باید وارد شوید');
    const url = `${API_BASE_URL}/tests/components/${id}`;
    return await apiRequestWithRetry(url, { method: 'DELETE', token });
  },
};

export default testsApi;
