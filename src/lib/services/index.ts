import {
  getCharacterClassMisionsAPI,
  getClassesAPI,
} from "@/app/axios/classApi";
import { getMailboxAPI } from "@/app/axios/mailboxAPI";
import { progressMapAPI } from "@/app/axios/map";
import { getSkinsAPI } from "@/app/axios/skinAPI";
import { Skin } from "../types/skinTypes";
import { Class } from "../types/classTypes";
import { CharacterClassMission } from "../types/characterTypes";
import { MapsResponse } from "../types/mapTypes";
import { Mailbox } from "../types/mailboxTypes";
import { ResponseDailyLogin } from "../types/dailyLoginTypes";
import { getDailyLoginListAPI } from "@/app/axios/dailyLoginApi";

// tải các phần khác của game
export const init = async (
  characterId: string,
  setSkins: (data: Skin[]) => void,
  setClasses: (classes: Class[] | []) => void,
  setCharacterClassMission: (
    characterClassMission: CharacterClassMission[] | [],
  ) => void,
  setProgressMap: (maps: MapsResponse[] | []) => void,
  setMailboxes: (mailboxes: Mailbox[] | []) => void,
  setDailyLogins: (daily: ResponseDailyLogin | null) => void,
) => {
  const [
    skinResult,
    classResult,
    classMisionsResult,
    mapResult,
    mailboxResult,
    dailyLoginResult,
  ] = await Promise.allSettled([
    getSkinsAPI(),
    getClassesAPI(),
    getCharacterClassMisionsAPI(characterId),
    progressMapAPI(),
    getMailboxAPI(characterId),
    getDailyLoginListAPI(),
  ]);

  // tải danh sách skin từ API
  if (skinResult.status === "fulfilled") {
    setSkins(skinResult.value);
  } else {
    console.error("Load skins failed", skinResult.reason);
  }

  // tải danh sách class từ API
  if (classResult.status === "fulfilled") {
    setClasses(classResult.value);
  } else {
    console.error("Load classes failed", classResult.reason);
  }

  // tải danh sách nhiệm vụ class từ API
  if (classMisionsResult.status === "fulfilled") {
    setCharacterClassMission(classMisionsResult.value);
  } else {
    console.error("Load class missions failed", classMisionsResult.reason);
  }

  // tải danh sách bản đồ từ API
  if (mapResult.status === "fulfilled") {
    setProgressMap(mapResult.value);
  } else {
    console.error("Load map failed", mapResult.reason);
  }

  // tải mailbox
  if (mailboxResult.status === "fulfilled") {
    setMailboxes(mailboxResult.value);
  } else {
    console.error("Load mailbox failed", mailboxResult.reason);
  }

  // tải sự kiện đăng nhập hằng ngày
  if (dailyLoginResult.status === "fulfilled") {
    setDailyLogins(dailyLoginResult.value);
  } else {
    console.error("Load mailbox failed", dailyLoginResult.reason);
  }
};
