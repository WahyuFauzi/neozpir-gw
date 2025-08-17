import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { loginUser, getJwt } from "../service/auth.service";
import { useAuthContext } from "../context/auth.context";

const Login: Component = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  createEffect(() => {
    if (auth()?.session) {
      navigate("/");
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const session = await loginUser(email(), password());
      const jwt = await getJwt();
      setAuth({ session, providedToken: jwt });
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error);
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
            </div>
            <div class="flex items-center justify-between">
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
