"use client";
import { signOut } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";

export default function SignOut() {
  return (
    <div className="tooltip tooltip-bottom" data-tip="Sign-Out">
      <button
        className="p-1 rounded-md border border-slate-400 bg-white/10 hover:bg-white/40"
        onClick={() => {
          localStorage.removeItem("shortener-user");
          signOut({ redirect: true, callbackUrl: "/login" });
        }}
      >
        <PiSignOutBold className="text-2xl" />
      </button>
    </div>
  );
}
