"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function EcommerceLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to dashboard.
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    const authExpiry = Cookies.get("authExpiry");

    if (isAuthenticated && authExpiry && Date.now() < Number(authExpiry)) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate credentials
    if (username === "admin" && password === "12345") {
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day expiry
      Cookies.set("isAuthenticated", "true", { expires: 1 });
      Cookies.set("authExpiry", expiryTime.toString(), { expires: 1 });
      Cookies.set("token", "dummy-token", { expires: 1 }); // dummy token

      setSuccess("Logged in successfully!");
      toast.success("Redirecting to Dashboard...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      toast.error("Invalid credentials");
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Ecommerce Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-12 w-full px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-600" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 font-medium text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-500 font-medium text-sm">{success}</p>
          )}

          <Button type="submit" className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
