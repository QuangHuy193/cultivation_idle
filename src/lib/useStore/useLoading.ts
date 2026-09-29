import { create } from "zustand";

export type LoadingState = {
  signin: boolean; // đăng nhập
  signup: boolean; // đăng kí
  unequip: boolean; // gỡ trang bị
  equip: boolean; // trang bị
  useItem: boolean; // dùng vật phẩm
  unequipSkill: boolean; // gỡ trang bị skill
  equipSkill: boolean; // trang bị skill
  getMaps: boolean; // tải map
  break: boolean; // đột phá cảnh giới
  redeemCode: boolean; // đổi code
  selectClass: boolean; // chọn class
  rewardCulOff: boolean; // nhận thưởng tu vi khi offline
  rewardMailbox: boolean; // nhận quà từ mail
  changeName: boolean; //đổi tên
  rewardDailyLogin: boolean; // nhận quà đăng nhập hằng ngày
  getUser: boolean; // tải user
  getRealms: boolean; // lấy danh sách cảnh giới
  equipSkin: string; // trang bị skin
  buySkin: string; //mua skin
  getSkins: boolean; // tải ds skin
  getClasses: boolean; //tải ds class
  getMailboxes: boolean; // tải ds mail
  getCharacterClassMisions: boolean; // tải ds nv hệ phái của nhân vật
  getDailyLogin: boolean; // tải sự kiện dailyLogin
};

type useLoadingState = {
  loading: LoadingState;
  setLoading: <K extends keyof LoadingState>(
    key: K,
    value: LoadingState[K],
  ) => void;
};
export const useLoadingStore = create<useLoadingState>()((set) => ({
  loading: {
    signin: false,
    signup: false,
    unequip: false,
    equip: false,
    useItem: false,
    unequipSkill: false,
    equipSkill: false,
    getMaps: false,
    break: false,
    redeemCode: false,
    selectClass: false,
    rewardCulOff: false,
    rewardMailbox: false,
    changeName: false,
    rewardDailyLogin: false,
    getUser: false,
    getRealms: false,
    equipSkin: "",
    buySkin: "",
    getSkins: false,
    getClasses: false,
    getMailboxes: false,
    getCharacterClassMisions: false,
    getDailyLogin: false,
  },
  setLoading: (key, value) =>
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value,
      },
    })),
}));
