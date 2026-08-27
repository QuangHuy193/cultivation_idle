"use client";

import { getClassesAPI } from "@/app/axios/classApi";
import { DEFAULT_IMG_HOME } from "@/lib/constants/imageConstants";
import { useClassStore } from "@/lib/useStore/useClassStore";
import { useEffect } from "react";
import SelectClass from "./SelectClass";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import ClassMission from "./ClassMission";

export default function ClassTab() {
  const { character } = useCharacterStore();
  const { loadingUseClass, classes, setClasses, setLoadingUseClass } =
    useClassStore();

  useEffect(() => {
    const getClassesApi = async () => {
      try {
        setLoadingUseClass(true);
        const res = await getClassesAPI();
        setClasses(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUseClass(false);
      }
    };
    getClassesApi();
  }, []);
  return (
    <section
      className="w-full h-full pb-16"
      style={{
        backgroundImage: `url(${DEFAULT_IMG_HOME})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {character?.class?.classId ? <ClassMission /> : <SelectClass />}
    </section>
  );
}
