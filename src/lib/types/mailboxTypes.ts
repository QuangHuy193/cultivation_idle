import { IRewards } from "./../models/Code";

export interface Mailbox {
  _id: string;
  content: string;
  characterId: string;
  title: string;
  status: number;
  reward: IRewards;
  createdAt: string;
  updatedAt: string;
}
