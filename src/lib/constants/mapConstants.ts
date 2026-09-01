export const RARITY_TEXT_MAP = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "Thường";
    case "uncommon":
      return "Hiếm";
    case "rare":
      return "Đặc biệt";
    case "epic":
      return "Cực phẩm";
    case "legendary":
      return "Huyền thoại";
    default:
      return "Thường";
  }
};

export const SKILL_TYPE_TEXT_MAP = (type: string) => {
  switch (type) {
    case "sword":
      return "Kiếm";
    case "pill":
      return "Đan dược";
    case "formation":
      return "Trận pháp";
    default:
      return "Không";
  }
};