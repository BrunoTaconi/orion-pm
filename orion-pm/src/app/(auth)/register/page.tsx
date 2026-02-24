"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

export default function RegisterPage() {
  const [open] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  function validatePassword(pass: string) {
    const validationErrors = [];

    if (pass.length < 8) {
      validationErrors.push("At least 8 characters");
    }

    if (!/[A-Z]/.test(pass)) {
      validationErrors.push("One uppercase letter");
    }

    if (!/[a-z]/.test(pass)) {
      validationErrors.push("One lowercase letter");
    }

    if (!/[0-9]/.test(pass)) {
      validationErrors.push("One number");
    }

    return validationErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const passErrors = validatePassword(password);

    if (password !== confirmPassword) {
      passErrors.push("Passwords must match");
    }

    setErrors(passErrors);

    if (passErrors.length > 0) return;

    console.log({
      email,
      password,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
      <Modal
        isOpen={open}
        onClose={() => {}}
        title="I think we have never met!"
        subtitle="Create your Orion PM account"
        size="md"
        closeOnOverlayClick={false}
        showCloseButton={false}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-body">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-border rounded-sm px-3 py-2 bg-bg-primary outline-none focus:ring-1 focus:ring-accent-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-body">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full border border-border rounded-sm px-3 py-2 bg-bg-primary outline-none focus:ring-1 focus:ring-accent-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-body">Confirm password</label>
            <input
              type="password"
              required
              className="mt-1 w-full border border-border rounded-sm px-3 py-2 bg-bg-primary outline-none focus:ring-1 focus:ring-accent-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="text-sm text-red-500 space-y-1">
              {errors.map((err, i) => (
                <p key={i}>• {err}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent-primary text-white py-2 rounded-sm font-normal hover:opacity-90 transition cursor-pointer"
          >
            Create account
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-border flex-1" />
          <span className="text-sm">or</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* OAuth */}
        <div className="space-y-2">
          <button className="flex text-text-secondary items-center cursor-pointer justify-center gap-3 w-full border border-border rounded-md py-2 hover:bg-gray-100 hover:text-text-primary transition">
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <button className="flex text-text-secondary items-center cursor-pointer justify-center gap-3 w-full border border-border rounded-md py-2 hover:bg-gray-100 hover:text-text-primary transition">
            <SiGithub size={18} />
            Sign up with Github
          </button>
        </div>
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent-primary hover:underline">
            Login
          </Link>
        </p>
      </Modal>
    </div>
  );
}
