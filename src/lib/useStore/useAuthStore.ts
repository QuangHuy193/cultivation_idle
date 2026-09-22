import { create } from "zustand";
import { SignInPayload, SignUpPayload } from "../types/userTypes";

interface useAuthState {
  error: string | null;
  dataSigninForm: SignInPayload;
  dataSignupForm: SignUpPayload;

  setError: (err: string | null) => void;
  updateDataSigninForm: (field: keyof SignInPayload, value: string) => void;
  updateDataSignupForm: (data: {
    email?: string;
    password?: string;
    passwordAgain?: string;
  }) => void;
  deletePassword: () => void;
  initForm: () => void;
}

export const useAuthStore = create<useAuthState>()((set) => ({
  error: null,
  dataSigninForm: { email: "", password: "" },
  dataSignupForm: { email: "", password: "", passwordAgain: "" },

  updateDataSigninForm: (field, value) => {
    set((state) => ({
      ...state,
      dataSigninForm: {
        ...state.dataSigninForm,
        [field]: value,
      },
    }));
  },
  updateDataSignupForm: (data) => {
    set((state) => ({
      ...state,
      dataSignupForm: {
        ...state.dataSignupForm,
        ...data,
      },
    }));
  },
  setError: (err) => {
    set((state) => ({
      ...state,
      error: err,
    }));
  },
  deletePassword: () => {
    set((state) => ({
      ...state,
      dataSigninForm: {
        ...state.dataSigninForm,
        password: "",
      },
      dataSignupForm: {
        ...state.dataSignupForm,
        password: "",
        passwordAgain: "",
      },
    }));
  },
  initForm: () => {
    set((state) => ({
      ...state,
      dataSigninForm: {
        email: "",
        password: "",
      },
      dataSignupForm: {
        email: "",
        password: "",
        passwordAgain: "",
      },
    }));
  },
}));
