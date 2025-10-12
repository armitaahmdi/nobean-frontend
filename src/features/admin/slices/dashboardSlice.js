import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../../services/dashboardApi';

// Async thunks for dashboard data
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (token, { rejectWithValue }) => {
    try {
      const stats = await dashboardApi.getDashboardStats(token);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت آمار داشبورد');
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'dashboard/fetchUserStats',
  async (token, { rejectWithValue }) => {
    try {
      const stats = await dashboardApi.getUserStats(token);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت آمار کاربران');
    }
  }
);

export const fetchTestStats = createAsyncThunk(
  'dashboard/fetchTestStats',
  async (token, { rejectWithValue }) => {
    try {
      const stats = await dashboardApi.getTestStats(token);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت آمار آزمون‌ها');
    }
  }
);

export const fetchExamAttemptsStats = createAsyncThunk(
  'dashboard/fetchExamAttemptsStats',
  async ({ token, params = {} }, { rejectWithValue }) => {
    try {
      const stats = await dashboardApi.getExamAttemptsStats(token, params);
      return stats;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت آمار تلاش‌های آزمون');
    }
  }
);

export const fetchRecentUsers = createAsyncThunk(
  'dashboard/fetchRecentUsers',
  async ({ token, limit = 5 }, { rejectWithValue }) => {
    try {
      const users = await dashboardApi.getRecentUsers(token, limit);
      return users;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت کاربران اخیر');
    }
  }
);

export const fetchRecentActivities = createAsyncThunk(
  'dashboard/fetchRecentActivities',
  async ({ token, limit = 10 }, { rejectWithValue }) => {
    try {
      const activities = await dashboardApi.getRecentActivities(token, limit);
      return activities;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت فعالیت‌های اخیر');
    }
  }
);

// Initial state
const initialState = {
  // آمار کلی داشبورد
  dashboardStats: {
    users: {
      total: 0,
      active: 0,
      inactive: 0,
      byRole: [],
      recent: []
    },
    tests: {
      total: 0,
      active: 0,
      draft: 0,
      totalQuestions: 0,
      totalParticipants: 0
    },
    examAttempts: {
      totalAttempts: 0,
      completedAttempts: 0,
      averageScore: 0
    },
    coursesPurchased: 0,
    consultants: 0,
    successfulConsultations: 0,
    articles: 0,
    podcasts: 0,
    comments: 0
  },
  
  // آمار جداگانه
  userStats: null,
  testStats: null,
  examAttemptsStats: null,
  
  // داده‌های اخیر
  recentUsers: [],
  recentActivities: [],
  
  // وضعیت‌های بارگذاری
  loading: {
    dashboardStats: false,
    userStats: false,
    testStats: false,
    examAttemptsStats: false,
    recentUsers: false,
    recentActivities: false
  },
  
  // خطاها
  errors: {
    dashboardStats: null,
    userStats: null,
    testStats: null,
    examAttemptsStats: null,
    recentUsers: null,
    recentActivities: null
  },
  
  // وضعیت کلی
  isInitialized: false,
  lastUpdated: null
};

// Dashboard slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // پاک کردن خطاها
    clearErrors: (state) => {
      state.errors = {
        dashboardStats: null,
        userStats: null,
        testStats: null,
        examAttemptsStats: null,
        recentUsers: null,
        recentActivities: null
      };
    },
    
    // پاک کردن خطای خاص
    clearError: (state, action) => {
      const errorType = action.payload;
      if (state.errors[errorType]) {
        state.errors[errorType] = null;
      }
    },
    
    // بازنشانی وضعیت
    resetDashboard: (state) => {
      return { ...initialState };
    },
    
    // به‌روزرسانی دستی آمار
    updateStats: (state, action) => {
      const { statsType, data } = action.payload;
      if (statsType === 'dashboard') {
        state.dashboardStats = { ...state.dashboardStats, ...data };
      } else if (state[statsType]) {
        state[statsType] = data;
      }
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading.dashboardStats = true;
        state.errors.dashboardStats = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading.dashboardStats = false;
        state.dashboardStats = action.payload;
        state.isInitialized = true;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading.dashboardStats = false;
        state.errors.dashboardStats = action.payload;
      })
      
      // User Stats
      .addCase(fetchUserStats.pending, (state) => {
        state.loading.userStats = true;
        state.errors.userStats = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading.userStats = false;
        state.userStats = action.payload;
        state.dashboardStats.users = action.payload.stats || state.dashboardStats.users;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading.userStats = false;
        state.errors.userStats = action.payload;
      })
      
      // Test Stats
      .addCase(fetchTestStats.pending, (state) => {
        state.loading.testStats = true;
        state.errors.testStats = null;
      })
      .addCase(fetchTestStats.fulfilled, (state, action) => {
        state.loading.testStats = false;
        state.testStats = action.payload;
        
        // محاسبه آمار آزمون‌ها
        const tests = action.payload || [];
        state.dashboardStats.tests = {
          total: tests.length,
          active: tests.filter(test => test.status === 'active').length,
          draft: tests.filter(test => test.status === 'draft').length,
          totalQuestions: tests.reduce((sum, test) => sum + (test.question_count || 0), 0),
          totalParticipants: tests.reduce((sum, test) => sum + (test.participantCount || 0), 0)
        };
      })
      .addCase(fetchTestStats.rejected, (state, action) => {
        state.loading.testStats = false;
        state.errors.testStats = action.payload;
      })
      
      // Exam Attempts Stats
      .addCase(fetchExamAttemptsStats.pending, (state) => {
        state.loading.examAttemptsStats = true;
        state.errors.examAttemptsStats = null;
      })
      .addCase(fetchExamAttemptsStats.fulfilled, (state, action) => {
        state.loading.examAttemptsStats = false;
        state.examAttemptsStats = action.payload;
        
        // محاسبه آمار تلاش‌های آزمون
        const attempts = action.payload.attempts || [];
        state.dashboardStats.examAttempts = {
          totalAttempts: attempts.length,
          completedAttempts: attempts.filter(attempt => attempt.status === 'completed').length,
          averageScore: attempts.length > 0 
            ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length)
            : 0
        };
      })
      .addCase(fetchExamAttemptsStats.rejected, (state, action) => {
        state.loading.examAttemptsStats = false;
        state.errors.examAttemptsStats = action.payload;
      })
      
      // Recent Users
      .addCase(fetchRecentUsers.pending, (state) => {
        state.loading.recentUsers = true;
        state.errors.recentUsers = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.loading.recentUsers = false;
        state.recentUsers = action.payload.users || [];
        state.dashboardStats.users.recent = action.payload.users || [];
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.loading.recentUsers = false;
        state.errors.recentUsers = action.payload;
      })
      
      // Recent Activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading.recentActivities = true;
        state.errors.recentActivities = null;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading.recentActivities = false;
        console.log('Dashboard slice - Recent activities payload:', action.payload);
        state.recentActivities = action.payload.attempts || [];
        console.log('Dashboard slice - Stored recent activities:', state.recentActivities);
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading.recentActivities = false;
        state.errors.recentActivities = action.payload;
      });
  }
});

// Export actions
export const { clearErrors, clearError, resetDashboard, updateStats } = dashboardSlice.actions;

// Selectors
export const selectDashboardStats = (state) => state.dashboard.dashboardStats;
export const selectUserStats = (state) => state.dashboard.userStats;
export const selectTestStats = (state) => state.dashboard.testStats;
export const selectExamAttemptsStats = (state) => state.dashboard.examAttemptsStats;
export const selectRecentUsers = (state) => state.dashboard.recentUsers;
export const selectRecentActivities = (state) => state.dashboard.recentActivities;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardErrors = (state) => state.dashboard.errors;
export const selectIsDashboardInitialized = (state) => state.dashboard.isInitialized;
export const selectLastUpdated = (state) => state.dashboard.lastUpdated;

// Selector برای بررسی وجود خطا
export const selectHasErrors = (state) => {
  const errors = state.dashboard.errors;
  return Object.values(errors).some(error => error !== null);
};

// Selector برای بررسی وضعیت بارگذاری
export const selectIsLoading = (state) => {
  const loading = state.dashboard.loading;
  return Object.values(loading).some(loadingState => loadingState === true);
};

export default dashboardSlice.reducer;
