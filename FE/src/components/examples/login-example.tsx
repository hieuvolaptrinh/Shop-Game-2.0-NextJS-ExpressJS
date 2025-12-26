'use client';

import { useAuth, useLogin, useLogout } from '@/hooks/useAuth';
import { useState } from 'react';

/**
 * Example Login Component
 * Demonstrates secure authentication with Context + HTTP-only cookies
 */
export function LoginExample() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      // Automatically:
      // 1. Stores user + accessToken in Context (memory)
      // 2. Backend sets refreshToken in HTTP-only cookie
      // 3. Redirects to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      // Automatically:
      // 1. Calls logout API
      // 2. Backend clears HTTP-only cookie
      // 3. Clears Context
      // 4. Redirects to login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Welcome, {user.username}!</h2>
        <div className="space-y-2 mb-4">
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Balance: ${user.balance}</p>
          <p>Status: {user.status}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Security Info:</h3>
          <ul className="text-sm space-y-1">
            <li>✅ Access token stored in Context (memory only)</li>
            <li>✅ Refresh token in HTTP-only cookie</li>
            <li>✅ Protected from XSS attacks</li>
            <li>✅ CSRF protection with SameSite cookie</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
        {loginMutation.isError && (
          <p className="text-red-500 text-sm">Login failed. Please check your credentials.</p>
        )}
      </form>
      <div className="mt-6 p-4 bg-green-50 rounded text-sm">
        <h3 className="font-bold mb-2 text-green-800">🔐 Security Features:</h3>
        <ul className="space-y-1 text-green-700">
          <li>• Access token in memory (Context)</li>
          <li>• Refresh token in HTTP-only cookie</li>
          <li>• Automatic token refresh</li>
          <li>• XSS & CSRF protection</li>
        </ul>
      </div>
    </div>
  );
}
