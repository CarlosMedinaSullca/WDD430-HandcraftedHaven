"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/components/authStore";
import { useNavigationWithLoading } from "@/app/components/useNavigationWithLoading";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { navigateWithLoading, NavigationSpinner } = useNavigationWithLoading();
  // Usamos tu authStore en lugar de NextAuth
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // ✅ Usamos tu authStore en lugar de signIn
    const result = await login(email, password);;
    if (!result.success) {
      setError(result.error || "Invalid credentials");
    } else {
      // ✅ Obtenemos el estado actual del store para ver el rol
      const { artisan, profile } = useAuthStore.getState();
      console.log("Login successful:", result);
      if (artisan) {
        navigateWithLoading(`/profile/${profile!._id}`); 
      } else {
        navigateWithLoading("/products"); 
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign in to Handcrafted Haven
        </h1>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
       <NavigationSpinner />
    </div>
  );
}