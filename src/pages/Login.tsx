import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { authService } from "../service/auth.service";
import { useAuthContext } from "../context/auth.context";

const Login: Component = () => {
  const [email, setEmail] = createSignal("");
  const [emailError, setEmailError] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  createEffect(() => {
    if (auth()?.session) {
      navigate("/");
    }
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

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

    const emailValidationMessage = validateEmail(email());
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError("");
    }

    const pwdValidationMessage = validatePassword(password());
    if (pwdValidationMessage) {
      setPasswordError(pwdValidationMessage);
      return;
    } else {
      setPasswordError("");
    }

    try {
      await authService.loginUser(email(), password()); // setup session
      const user = await authService.getCurrentUser();
      if (user) {
        const jwt = await authService.getJwt();
        setAuth({ session: user, providedToken: jwt });
      }
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div class="mt-4">
            <div>
              <label class="block" for="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
              {emailError() && (
                <p class="text-red-500 text-xs mt-1">{emailError()}</p>
              )}
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
              {passwordError() && (
                <p class="text-red-500 text-xs mt-1">{passwordError()}</p>
              )}
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="text-sm">
                <a id="go-to-forgot-password" href="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md cursor-pointer bg-[#3DDC97] hover:bg-[#36c285] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
