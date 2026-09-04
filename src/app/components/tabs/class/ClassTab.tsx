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
