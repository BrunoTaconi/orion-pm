"use client"
import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/modal";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

export default function LoginPage() {
    const [open, setOpen] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log({
            email,
            password,
        });
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Nice to see you again!"
        subtitle="Login to your Orion PM account"
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

          <button
            type="submit"
            className="w-full bg-accent-primary text-white py-2 rounded-sm font-normal hover:opacity-90 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-border flex-1" />
          <span className="text-sm">or</span>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* OAuth */}
        <div className="space-y-2">
          <button className="flex text-text-secondary items-center cursor-pointer justify-center gap-3 w-full border border-border rounded-md py-2 hover:bg-gray-100 hover:text-text-primary  transition">
            <FcGoogle size={20} />  Continue with Google
          </button>

          <button className="flex  text-text-secondary items-center cursor-pointer justify-center gap-3 w-full border border-border rounded-md py-2 hover:bg-gray-100 hover:text-text-primary  transition">
            <SiGithub size={18}/>
            Continue with Github
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-accent-primary hover:underline"
          >
            Create account
          </Link>
        </p>

      </Modal>
    </div>
  );
}