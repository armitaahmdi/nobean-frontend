import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUserSession } from './slices/loginSlice';

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
