"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./LoginPage.css";

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        resetForm();
        router.push("/tasks");
        router.refresh();
      }
    } catch (error) {
      setError("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign in to your account</h2>
        <p>
          Or <a href="/auth/signup">create a new account</a>
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
          />

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
