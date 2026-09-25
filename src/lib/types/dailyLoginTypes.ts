import { RewardItems } from "./mapTypes";
export interface ReawardFull extends RewardItems {
  spiritStone: number;
  cultivation: number;
}

export interface DayInResponseDailyLogin {
  _id: string;
  day: number;
  reward: ReawardFull;
}

export interface ResponseDailyLogin {
  _id: string;
  name: string;
  active: boolean;
  days: DayInResponseDailyLogin[];
}
