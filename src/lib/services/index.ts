import {
  getCharacterClassMisionsAPI,
  getClassesAPI,
} from "@/app/axios/classApi";
import { getMailboxAPI } from "@/app/axios/mailboxAPI";
import { progressMapAPI } from "@/app/axios/map";
import { getSkinsAPI } from "@/app/axios/skinAPI";

// tải các phần khác của game
export const init = async (
  characterId: string,
  setSkins,
  setClasses,
  setCharacterClassMission,
  setProgressMap,
  setMailboxes,
  
) => {
  const [
    skinResult,
    classResult,
    classMisionsResult,
    mapResult,
    mailboxResult,
  ] = await Promise.allSettled([
    getSkinsAPI(),
    getClassesAPI(),
    getCharacterClassMisionsAPI(characterId),
    progressMapAPI(),
    getMailboxAPI(characterId),
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
};
