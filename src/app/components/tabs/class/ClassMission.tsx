import React from "react";
import SplitLayout from "../../layout/SplitLayout";
import ClassMissonTop from "./ClassMissonTop";
import ClassMissonBottom from "./ClassMissonBottom";

const ClassMission = () => {
  return (
    <div className="w-full h-full bg-zinc-50">
      <SplitLayout
        top={<ClassMissonTop />}
        bottom={<ClassMissonBottom />}
        percentTop="flex-4"
        percentBottom="flex-8"
      />
    </div>
  );
};

export default ClassMission;
