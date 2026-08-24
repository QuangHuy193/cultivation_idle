export const CLASS_COATING_SM =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/20";
export const CLASS_COATING_L =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/40";
export const CLASS_COATING_XL =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60";

export const CLASS_X_ALERT = `absolute -right-2 -top-2 flex h-9 w-9 items-center 
justify-center rounded-full border-2 border-red-300 bg-white shadow-md`;

export const RARITY_CSS: Record<
  string,
  { border: string; text: string; bg: string }
> = {
  common: {
    border: "border-gray-400",
    text: "text-gray-400",
    bg: "bg-gray-400",
  },
  uncommon: {
    border: "border-green-500",
    text: "text-green-500",
    bg: "bg-green-500",
  },
  rare: {
    border: "border-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-500",
  },
  epic: {
    border: "border-purple-500",
    text: "text-purple-500",
    bg: "bg-purple-500",
  },
  legendary: {
    border: "border-orange-500",
    text: "text-orange-500",
    bg: "bg-orange-500",
  },
};

export const REALM_CSS = {
  luyenkhi: {
    text: "text-slate-300",
    border: "border-slate-400",
    glow: "",
  },

  trucco: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },

  kimdan: {
    text: "text-yellow-400",
    border: "border-yellow-500",
    glow: "drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]",
  },

  nguyenanh: {
    text: "text-purple-400",
    border: "border-purple-500",
    glow: "drop-shadow-[0_0_15px_rgba(168,85,247,1)] animate-pulse",
  },

  hoathan: {
    text: "text-orange-400",
    border: "border-orange-500",
    glow: "drop-shadow-[0_0_20px_rgba(251,146,60,1)] animate-realm-fire",
  },
};
