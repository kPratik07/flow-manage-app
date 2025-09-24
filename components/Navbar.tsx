"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="nav-brand">
          Flow Manage
        </Link>
        {/* <div className="nav-links">
          <Link href="/tasks" className="nav-link">
            Tasks
          </Link>
          <button onClick={() => signOut()} className="sign-out-button">
            Sign Out
          </button>
        </div> */}
      </div>
    </nav>
  );
}
