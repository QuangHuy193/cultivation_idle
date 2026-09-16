"use client";

import Image from "next/image";
import { useState } from "react";
import OfflineRewardAlert from "../alert/OfflineRewardAlert";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";

const OfflineRewardIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { character } = useCharacterStore();

  return (
    <div className="fixed right-3 bottom-50">
      <button>
        <Image
          onClick={() => setIsOpen(true)}
          src="/icons/afk_reward.webp"
          alt="Claim Offline Reward"
          width={80}
          height={80}
        />
      </button>

      {isOpen && <OfflineRewardAlert setIsOpen={setIsOpen} />}
    </div>
  );
};

export default OfflineRewardIcon;
