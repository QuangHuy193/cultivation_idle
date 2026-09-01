"use client";

import { FormEvent, useState } from "react";
import { signInAPI } from "@/app/axios/userAPI";
import { useUserStore } from "@/lib/useStore/useUserStore";
import { SignInPayload } from "@/lib/types/userTypes";

interface SignInFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignInForm({ onClose, onSuccess }: SignInFormProps) {
  const [form, setForm] = useState<SignInPayload>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useUserStore((state) => state.setAuth);

  const handleChange = (field: keyof SignInPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signInAPI(form);
      setAuth({ email: result.user.email, token: result.token, _id: result.user._id });
      onSuccess();
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <form
        onSubmit={handleSubmit}
        className="relative mx-3 z-10 w-full max-w-md rounded-lg bg-sky-50 p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 inline-flex h-10 w-10 
            items-center justify-center rounded-full bg-zinc-100
             text-red-500 font-bold shadow transition"
          aria-label="Đóng"
        >
          ×
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Đăng nhập</h2>
          <p className="mt-2 text-sm text-slate-500">
            Đăng nhập bằng email và mật khẩu để tiếp tục vào thế giới tu tiên.
          </p>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="nhập email"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Mật khẩu</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="nhập mật khẩu"
              required
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      </form>
    </div>
  );
}
