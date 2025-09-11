import { useSelector } from 'react-redux';

export default function AuthDebugger() {
  const auth = useSelector((state) => state.auth);
  
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded-lg shadow-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <div>Authenticated: {auth.isAuthenticated ? '✅' : '❌'}</div>
        <div>Has Token: {auth.token ? '✅' : '❌'}</div>
        <div>Token Length: {auth.token ? auth.token.length : 0}</div>
        <div>User Phone: {auth.user?.phone || 'N/A'}</div>
        <div>User Role: {auth.user?.role || 'N/A'}</div>
        <div>Loading: {auth.isLoading ? '⏳' : '✅'}</div>
        {auth.error && <div className="text-red-500">Error: {auth.error}</div>}
      </div>
    </div>
  );
}
