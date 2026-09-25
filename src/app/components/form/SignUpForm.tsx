import { signUpAPI } from "@/app/axios/userAPI";
import { validateDataAuthForm } from "@/lib/helper";
import { showSuccess } from "@/lib/toast";
import { useAuthStore } from "@/lib/useStore/useAuthStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const SignUpForm = () => {
  const { setFormOpen, formOpen } = useToggleStore();
  const {
    dataSignupForm,
    updateDataSignupForm,
    error,
    setError,
    deletePassword,
    updateDataSigninForm,
  } = useAuthStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();
  const [showPass, setShowPass] = useState({
    pass: false,
    passAgain: false,
  });

  const handleShowPass = (nameInput: keyof typeof showPass) => {
    setShowPass((prev) => ({
      ...prev,
      [nameInput]: !prev[nameInput],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validate = validateDataAuthForm(dataSignupForm);

    if (validate.check) {
      try {
        setActionLoadingName("signup");
        await signUpAPI({
          email: dataSignupForm.email,
          password: dataSignupForm.password,
        });
        updateDataSigninForm("email", dataSignupForm.email);
        updateDataSignupForm({ email: "", password: "", passwordAgain: "" });
        showSuccess("Đăng kí thành công");
        setFormOpen("signin");
      } catch (err: unknown) {
        setError((err as { message?: string })?.message || "Đăng kí thất bại");
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
          <h2 className="text-2xl font-bold text-slate-900">Đăng kí</h2>
          <p className="mt-2 text-sm text-slate-500">
            Đăng kí bằng email và mật khẩu để tạo tài khoản trong thế giới tu
            tiên.
          </p>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              type="email"
              value={dataSignupForm.email}
              onChange={(e) => updateDataSignupForm({ email: e.target.value })}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="nhập email"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Mật khẩu</span>
            <div className="relative">
              <input
                type={showPass.pass ? "text" : "password"}
                value={dataSignupForm.password}
                onChange={(e) =>
                  updateDataSignupForm({ password: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="nhập mật khẩu"
                required
              />
              {dataSignupForm.password.length > 0 ? (
                showPass.pass ? (
                  <EyeOff
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      handleShowPass("pass");
                    }}
                  />
                ) : (
                  <Eye
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      handleShowPass("pass");
                    }}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Nhập lại mật khẩu</span>
            <div className="relative">
              <input
                type={showPass.passAgain ? "text" : "password"}
                value={dataSignupForm.passwordAgain}
                onChange={(e) =>
                  updateDataSignupForm({ passwordAgain: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="nhập lại mật khẩu"
                required
              />

              {dataSignupForm.passwordAgain.length > 0 ? (
                showPass.passAgain ? (
                  <EyeOff
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      handleShowPass("passAgain");
                    }}
                  />
                ) : (
                  <Eye
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      handleShowPass("passAgain");
                    }}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </label>
        </div>

        {error ? (
          <p
            className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 
          text-sm text-rose-700"
          >
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
            {actionLoadingName === "signup" ? "Đang đăng kí..." : "Đăng kí"}
          </button>

          <p>
            Đã có tài khoản?{" "}
            <span
              className="text-blue-400 border-b-2"
              onClick={() => {
                setFormOpen("signin");
              }}
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
