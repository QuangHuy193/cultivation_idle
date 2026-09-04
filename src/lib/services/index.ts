import { progressMapAPI } from "@/app/axios/characterAPI";
import {
  getCharacterClassMisionsAPI,
  getClassesAPI,
} from "@/app/axios/classApi";
import { getSkinsAPI } from "@/app/axios/skinAPI";

// tải các phần khác của game
export const init = async (
  characterId,
  setSkins,
  setLoadingUseClass,
  setClasses,
  setCharacterClassMission,
  setLoadingUseMap,
  setProgressMap
) => {
  try {
    setLoadingUseClass(true);
    setLoadingUseMap(true);

    const [skinResult, classResult, classMisionsResult, mapResult] =
      await Promise.allSettled([
        getSkinsAPI(),
        getClassesAPI(),
        getCharacterClassMisionsAPI(characterId),
        progressMapAPI(characterId),
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
  } finally {
    setLoadingUseClass(false);
    setLoadingUseMap(false);
  }
};
