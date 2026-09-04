// GET /api/class/mission/[characterId]

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import "@/lib/models";

import connectDB from "@/lib/db/db";

import CharacterClassMission from "@/lib/models/CharacterClassMission";
import ClassMission from "@/lib/models/ClassMission";

const RARITY_CONFIG = {
  common: {
    weight: 50,
    quantityMul: 1,
    expMul: 1,
  },
  uncommon: {
    weight: 30,
    quantityMul: 2,
    expMul: 2,
  },
  rare: {
    weight: 15,
    quantityMul: 4,
    expMul: 5,
  },
  epic: {
    weight: 4,
    quantityMul: 8,
    expMul: 10,
  },
  legendary: {
    weight: 1,
    quantityMul: 15,
    expMul: 20,
  },
};

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function randomRarity() {
  const total = Object.values(RARITY_CONFIG).reduce(
    (sum, item) => sum + item.weight,
    0,
  );

  let random = Math.random() * total;

  for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
    random -= config.weight;

    if (random <= 0) {
      return rarity;
    }
  }

  return "common";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ characterId: string }> },
) {
  try {
    await connectDB();

    const { characterId } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(characterId)) {
      return NextResponse.json(
        {
          message: "Character không hợp lệ",
        },
        {
          status: 400,
        },
      );
    }

    const today = getTodayString();

    let missions = await CharacterClassMission.find({
      characterId,
      date: today,
    })
      .populate({
        path: "missionId",
        populate: {
          path: "itemId",
        },
      })
      .lean();

    // Chưa có nhiệm vụ hôm nay => tạo mới
    if (missions.length === 0) {
      const missionTemplates = await ClassMission.find().lean();

      if (missionTemplates.length === 0) {
        return NextResponse.json(
          {
            message: "Chưa có dữ liệu nhiệm vụ",
          },
          {
            status: 404,
          },
        );
      }

      const newMissions = [];

      for (let i = 0; i < 10; i++) {
        const template =
          missionTemplates[Math.floor(Math.random() * missionTemplates.length)];

        const rarity = randomRarity();

        const rarityConfig =
          RARITY_CONFIG[rarity as keyof typeof RARITY_CONFIG];

        newMissions.push({
          characterId,

          missionId: template._id,

          rarity,

          quantity: (template.baseQuantity || 1) * rarityConfig.quantityMul,

          rewardExp: (template.expReward || 1) * rarityConfig.expMul,

          status: "pending",

          date: today,
        });
      }

      await CharacterClassMission.insertMany(newMissions);

      missions = await CharacterClassMission.find({
        characterId,
        date: today,
      })
        .populate({
          path: "missionId",
          populate: {
            path: "itemId",
          },
        })
        .lean();
    }

    return NextResponse.json({
      success: true,
      missions,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server",
      },
      {
        status: 500,
      },
    );
  }
}
