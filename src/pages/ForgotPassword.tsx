import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import AuthService from '../service/auth.service';

const ForgotPassword: Component = () => {
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [error, setError] = createSignal('');
  const authService = new AuthService();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // The URL below should be the full URL to your reset password page
      // For example: https://yourdomain.com/reset-password
      const resetUrl = `${window.location.origin}/reset-password`;
      await authService.forgotPassword(email(), resetUrl);
      setMessage(
        'If an account with that email exists, a password reset link has been sent to your email address.',
      );
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div class="mt-4">
            <div>
              <label class="block" for="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>
            {message() && <p class="text-green-500 text-sm mt-4">{message()}</p>}
            {error() && <p class="text-red-500 text-sm mt-4">{error()}</p>}
            <div class="mt-6">
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
