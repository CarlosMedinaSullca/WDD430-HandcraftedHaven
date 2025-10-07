"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false, // 👈 we control the redirect
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials. Try seller:1234 or customer:1234");
    } else {
      // ✅ Get session info to check role
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      if (session?.user?.role === "seller") {
        router.push("/profile");
      } else if (session?.user?.role === "customer") {
        router.push("/"); // send customers back to homepage
      } else {
        router.push("/"); // fallback
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
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username"
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
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
