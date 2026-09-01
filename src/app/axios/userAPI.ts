import { SignInPayload, SignInResponse } from "@/lib/types/userTypes";
import api from "./axios";

export async function signInAPI(
  payload: SignInPayload,
): Promise<SignInResponse> {
  try {
    const res = await api.post("/api/signin", payload);
    return res.data as SignInResponse;
  } catch (err: unknown) {
    throw new Error(
      (err as { message?: string })?.message || "Lỗi khi đăng nhập",
    );
  }
}
