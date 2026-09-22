"use client";

import { FormEvent, useEffect } from "react";
import { signInAPI } from "@/app/axios/userAPI";
import { useUserStore } from "@/lib/useStore/useUserStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { useAuthStore } from "@/lib/useStore/useAuthStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { validateDataAuthForm } from "@/lib/helper";

export default function SignInForm() {
  const { setFormOpen, formOpen } = useToggleStore();
  const {
    dataSigninForm,
    updateDataSigninForm,
    error,
    setError,
    deletePassword,
  } = useAuthStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();
  const setAuth = useUserStore((state) => state.setAuth);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validate = validateDataAuthForm(dataSigninForm);

    if (validate.check) {
      try {
        setActionLoadingName("signin");
        const result = await signInAPI(dataSigninForm);
        setAuth({
          email: result.user.email,
          token: result.token,
          _id: result.user._id,
        });
        setFormOpen("");

        setFormOpen("");
      } catch (err: unknown) {
        setError(
          (err as { message?: string })?.message || "Đăng nhập thất bại",
        );
      } finally {
        setActionLoadingName("");
      }
    } else {
      setError(validate.mess);
    }
  };

  useEffect(() => {
    deletePassword();
  }, [formOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <form
        onSubmit={handleSubmit}
        className="relative mx-3 z-10 w-full max-w-md rounded-lg bg-sky-50 p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={() => {
            setFormOpen("");
          }}
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
              value={dataSigninForm.email}
              onChange={(e) => updateDataSigninForm("email", e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="nhập email"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Mật khẩu</span>
            <input
              type="password"
              value={dataSigninForm.password}
              onChange={(e) => updateDataSigninForm("password", e.target.value)}
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

        <div className="mt-6 flex justify-center items-center gap-3 flex-col">
          <button
            type="submit"
            disabled={actionLoadingName === "signin"}
            className="flex items-center justify-center rounded-2xl bg-emerald-500 
            px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 
            transition disabled:cursor-not-allowed disabled:bg-emerald-300 w-[80%]"
          >
            {actionLoadingName === "signin" ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p>
            Chưa có tài khoản?{" "}
            <span
              className="text-blue-400 border-b-2"
              onClick={() => {
                setFormOpen("signup");
              }}
            >
              Đăng ký
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
