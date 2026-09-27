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

export const NAME_STAT_TEXT_MAP = (type: string) => {
  switch (type) {
    case "base":
      return "Chỉ số cơ bản của nhân vật";
    case "items":
      return "Chỉ số từ sử dụng vật phẩm";
    case "equips":
      return "Chỉ số từ trang bị";
    case "skins":
      return "Chỉ số từ trang phục sở hữu";
    case "realm":
      return "Chỉ số từ cảnh giới";
    case "class":
      return "Chỉ số từ hệ phái";
    default:
      return "Không";
  }
};