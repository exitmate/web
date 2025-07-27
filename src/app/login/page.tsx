"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <button onClick={() => signIn("kakao")}>Kakao Login</button>
    </div>
  )
}