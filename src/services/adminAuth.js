// Admin Authentication Service
// Simple phone-based authentication for admin access

const SUPERADMIN_PHONE = '09198718211';

export const adminAuth = {
  // Check if current user is superadmin based on phone number
  isSuperAdmin: (userPhone) => {
    return userPhone === SUPERADMIN_PHONE;
  },

  // Get superadmin phone number
  getSuperAdminPhone: () => SUPERADMIN_PHONE,

  // Validate admin access (both admin and superadmin)
  validateAdminAccess: (user) => {
    if (!user) return false;
    
    // Check if user has superadmin phone number
    if (user.phone === SUPERADMIN_PHONE) return true;
    
    // Check if user has admin or superadmin role (both structures)
    if ((user.user?.role === 'admin' || user.user?.role === 'superadmin') ||
        (user.role === 'admin' || user.role === 'superadmin')) return true;
    
    return false;
  },

  // Check if user can add other admins (only superadmin)
  canAddAdmins: (user) => {
    if (!user) return false;
    
    // Only superadmin phone or superadmin role can add admins
    return user.phone === SUPERADMIN_PHONE || 
           user.user?.role === 'superadmin' || 
           user.role === 'superadmin';
  },

  // Create admin token (simple implementation)
  createAdminToken: () => {
    return btoa(`${SUPERADMIN_PHONE}:${Date.now()}`);
  },

  // Verify admin token
  verifyAdminToken: (token) => {
    try {
      const decoded = atob(token);
      const [phone, timestamp] = decoded.split(':');
      return phone === SUPERADMIN_PHONE;
    } catch {
      return false;
    }
  }
};

export default adminAuth;
