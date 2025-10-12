import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../../services/userApi";
import { updateUserData } from "../../authentication/slices/loginSlice";

const initialState = {
  users: [],
  userStats: null,
  currentUser: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  },
  filters: {
    search: '',
    role: '',
    status: ''
  }
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.getUsers(params, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  "userManagement/fetchUserStats",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.getUserStats(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "userManagement/fetchUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.getUser(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "userManagement/createUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.createUser(userData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userManagement/updateUser",
  async ({ id, userData }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.updateUser(id, userData, token);
      
      // If this is the current user, update auth state
      const currentUser = getState().auth?.user;
      if (currentUser && currentUser.id === id) {
        dispatch(updateUserData(response.user));
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userManagement/deleteUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.deleteUser(id, token);
      return { id, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  "userManagement/toggleUserStatus",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const response = await userApi.toggleUserStatus(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        role: '',
        status: ''
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Stats
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.userStats = action.payload.stats;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload.user);
        state.pagination.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
        if (state.currentUser && state.currentUser.id === action.payload.user.id) {
          state.currentUser = action.payload.user;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload.id);
        state.pagination.total -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index].isActive = action.payload.user.isActive;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters, clearError, clearCurrentUser } = userManagementSlice.actions;
export default userManagementSlice.reducer;
