"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCharacterAPI, updateCulOffAPI } from "@/app/axios/characterAPI";
import SignInForm from "@/app/components/form/SignInForm";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useUserStore } from "@/lib/useStore/useUserStore";
import Loading from "./components/ui/Loading";
import { DEFAULT_IMG_Wait } from "@/lib/constants/imageConstants";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import SignUpForm from "./components/form/SignUpForm";
import { showToast } from "@/lib/toast";

export default function Home() {
  const { formOpen, setFormOpen } = useToggleStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { email, token, userId } = useUserStore();
  const { clearCharacter, setCharacter, updateCharacter, character } =
    useCharacterStore();
  const isLoggedIn = Boolean(token);

  function openLogin() {
    setFormOpen("signin");
  }

  async function enterWorld() {
    if (!token || !userId) {
      openLogin();
      return;
    }

    setActionLoadingName("getUser");
    setError(null);

    try {
      clearCharacter();
      const character = await getCharacterAPI(userId);
      setCharacter(character);
      router.push("/game");
    } catch (err) {
      setError(
        (err as { message?: string })?.message ||
          "Không thể tải dữ liệu nhân vật",
      );
    } finally {
      setActionLoadingName("");
    }
  }

  useEffect(() => {
    const updateTimeCharacterOnline = async () => {
      try {
        const res = await updateCulOffAPI(character?._id ?? "");

        updateCharacter(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (character?._id) {
      updateTimeCharacterOnline();
    }
  }, [character?._id]);

  useEffect(() => {
    if (isLoggedIn && email) {
      showToast(`Chào mừng ${email}`);
    }
  }, [isLoggedIn, email]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundImage: `url('${DEFAULT_IMG_Wait}')` }}
      aria-hidden
    >
      <div className="fixed inset-0 bg-black/10" aria-hidden />

      <header className="absolute top-1/3 left-0 right-0 flex justify-center pointer-events-none">
        <h1 className="pointer-events-auto text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
          Tu tiên thôi
        </h1>
      </header>

      <div className="absolute top-8 right-2 flex flex-col space-y-3">
        <button className="rounded-full w-10 h-10 bg-white/80 text-zinc-900 px-3 py-2 font-medium shadow hover:bg-white">
          1
        </button>
        <button className="rounded-full w-10 h-10 bg-white/80 text-zinc-900 px-3 py-2 font-medium shadow hover:bg-white">
          2
        </button>
        <button className="rounded-full w-10 h-10 bg-white/80 text-zinc-900 px-3 py-2 font-medium shadow hover:bg-white">
          3
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen items-end justify-center pb-20">
        <div className="flex flex-col items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={enterWorld}
              disabled={actionLoadingName === "getUser"}
              className="mx-auto rounded-full bg-emerald-500 px-8 py-4 text-center font-semibold 
              text-white shadow-2xl shadow-emerald-600/40 transition hover:bg-emerald-400 
              disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {actionLoadingName === "getUser"
                ? "Đang tải..."
                : "Tiến vào thế giới"}
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="mx-auto rounded-full bg-emerald-500 px-8 py-4 text-center 
              font-semibold text-white shadow-2xl shadow-emerald-600/40 transition"
            >
              Bắt đầu tu luyện
            </button>
          )}
        </div>
      </div>

      {actionLoadingName === "getUser" ? (
        <Loading message="Đang tải nhân vật..." />
      ) : null}

      {error ? (
        <div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full 
        bg-rose-500/95 px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          {error}
        </div>
      ) : null}

      {formOpen === "signin" && <SignInForm />}

      {formOpen === "signup" && <SignUpForm />}
    </main>
  );
}
