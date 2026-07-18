"use client";

import { requestPasswordReset } from "@/app/auth.actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await requestPasswordReset(formData);

    setLoading(false);
    if (result?.error) setError(result.error);
    if (result?.success) setMessage(result.success);
  }

  return (
    <main className = " flex flex-col justify-center items-center mt-4 h-100">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className = "flex flex-col gap-6 justify-center items-center">
        
          <label htmlFor="email" className = "mt-2">Enter email Below</label>
          <input type="email" id="email" name="email" required placeholder = "m@example.com" className ="text-center border-1 border-gray-200 rounded-md "/>
        
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
