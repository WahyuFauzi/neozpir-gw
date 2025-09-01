import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { useSearchParams, useNavigate } from "@solidjs/router";
import { authService } from "../service/auth.service";

const ResetPassword: Component = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [error, setError] = createSignal("");

  const [passwordError, setPasswordError] = createSignal("");
  const [confirmPasswordError, setConfirmPasswordError] = createSignal("");

  const userId = searchParams.userId;
  const secret = searchParams.secret;

  createEffect(() => {
    if (!userId || !secret) {
      setError("Invalid or missing password reset link.");
    }
  });

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one number.";
    }
    if (!/[a-zA-Z]/.test(pwd)) {
      return "Password must contain at least one letter.";
    }
    return "";
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const pwdValidationMessage = validatePassword(password());
    if (pwdValidationMessage) {
      setPasswordError(pwdValidationMessage);
      return;
    } else {
      setPasswordError("");
    }

    if (password() !== confirmPassword()) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (!userId || !secret) {
      setError("Invalid password reset link.");
      return;
    }

    try {
      await authService.resetPassword(userId as string, secret as string, password());
      setMessage("Your password has been reset successfully. You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Failed to reset password. The link might be expired or invalid.");
      console.error("Reset password error:", err);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div class="mt-4">
            <div>
              <label class="block">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
              {passwordError() && (
                <p class="text-red-500 text-xs mt-1">{passwordError()}</p>
              )}
            </div>
            <div class="mt-4">
              <label class="block">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={confirmPassword()}
                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                required
              />
              {confirmPasswordError() && (
                <p class="text-red-500 text-xs mt-1">{confirmPasswordError()}</p>
              )}
            </div>
            {message() && <p class="text-green-500 text-sm mt-4">{message()}</p>}
            {error() && <p class="text-red-500 text-sm mt-4">{error()}</p>}
            <div class="mt-6">
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md cursor-pointer bg-[#3DDC97] hover:bg-[#36c285] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
