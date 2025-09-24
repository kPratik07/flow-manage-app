"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const resetForm = () => {
    setFormData({
      name: "",
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        resetForm();
        router.push("/tasks");
      } else {
        const data = await response.json();
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
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
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create your account</h2>
        <p>
          Or <a href="/auth/login">sign in to existing account</a>
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />

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
            autoComplete="new-password"
          />

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
