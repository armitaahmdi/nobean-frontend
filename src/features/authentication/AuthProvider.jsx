import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUserSession } from './slices/loginSlice';
import { getProfile } from '../user/profile/profileSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('AuthProvider mounted:', {
      hasToken: !!token,
      isAuthenticated,
      hasUser: !!user,
      isLoading,
      tokenFromLocalStorage: !!localStorage.getItem('authToken')
    });

    // Check if we have a token in localStorage but no user session
    const localToken = localStorage.getItem('authToken');
    if (localToken && !isAuthenticated && !user && !isLoading) {
      console.log('Restoring user session...');
      dispatch(restoreUserSession());
    }
  }, [dispatch, token, isAuthenticated, user, isLoading]);

  // Additional effect to ensure profile data is complete after authentication
  useEffect(() => {
    if (isAuthenticated && user && token) {
      // Check if we have complete profile data
      const hasCompleteData = user.firstName && user.lastName && user.email && user.age;
      
      if (!hasCompleteData) {
        console.log('AuthProvider: User authenticated but profile data incomplete, fetching...');
        
        // Try to get complete profile data
        dispatch(getProfile()).then((result) => {
          if (result.payload) {
            console.log('AuthProvider: Profile data fetched successfully');
            // Update localStorage with complete data
            const updatedUserData = { ...user, ...result.payload };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
          }
        }).catch((error) => {
          console.error('AuthProvider: Failed to fetch profile data:', error);
        });
      } else {
        console.log('AuthProvider: Complete profile data already available');
      }
    }
  }, [isAuthenticated, user, token, dispatch]);

  // Show loading while restoring session
  if (localStorage.getItem('authToken') && !isAuthenticated && !user && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lightBlue mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
