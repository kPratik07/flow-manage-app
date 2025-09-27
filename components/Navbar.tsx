"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../styles/Navbar.css";

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/auth/login", // Redirect to login page after signout
      redirect: true, // Force redirect
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="nav-brand">
          Flow Manage
        </Link>
        <div className="nav-links">
          <Link href="/tasks" className="nav-link">
            Tasks
          </Link>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
