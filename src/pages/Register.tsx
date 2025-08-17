import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createUser } from "../service/auth.service";
import { useAuthContext } from "../context/auth.context";

const Register: Component = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  createEffect(() => {
    if (auth()?.session) {
      navigate("/login");
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (password() !== confirmPassword()) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUser(email(), password(), name());
      alert("Registration successful! Please check your email for a verification link.");
      navigate("/login"); // Redirect to login page after registration
    } catch (error) {
      alert("Registration failed: " + error);
      console.error("Registration error:", error);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Create a new account</h3>
        <form onSubmit={handleSubmit}>
          <div class="mt-4">
            <div>
              <label class="block" for="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                required
              />
            </div>
            <div class="mt-4">
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
            <div class="mt-4">
              <label class="block">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={confirmPassword()}
                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
