// Admin Authentication Service
// Simple phone-based authentication for admin access

const ADMIN_PHONE = '09198718211';

export const adminAuth = {
  // Check if current user is admin based on phone number
  isAdmin: (userPhone) => {
    return userPhone === ADMIN_PHONE;
  },

  // Get admin phone number
  getAdminPhone: () => ADMIN_PHONE,

  // Validate admin access
  validateAdminAccess: (user) => {
    if (!user) return false;
    
    // Check if user has admin phone number
    if (user.phone === ADMIN_PHONE) return true;
    
    // Check if user has admin role (for future use)
    if (user.role === 'admin' || user.role === 'superadmin') return true;
    
    return false;
  },

  // Create admin token (simple implementation)
  createAdminToken: () => {
    return btoa(`${ADMIN_PHONE}:${Date.now()}`);
  },

  // Verify admin token
  verifyAdminToken: (token) => {
    try {
      const decoded = atob(token);
      const [phone, timestamp] = decoded.split(':');
      return phone === ADMIN_PHONE;
    } catch {
      return false;
    }
  }
};

export default adminAuth;
