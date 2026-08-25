import { NextResponse } from "next/server";

import Character from "@/lib/models/Character";
import "@/lib/models/Realm";
import "@/lib/models/Equip";
import "@/lib/models/Item";
import "@/lib/models/Skill";
import "@/lib/models/Skin";
import "@/lib/models/Map";
import {
  addBreakthroughInfo,
  calculateCharacterStats,
  characterPopulate,
} from "@/lib/helper";
import connectDB from "@/lib/db/db";

function generateRandomName() {
  const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);

  return `user${randomSuffix}`;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Vui lòng gửi userId",
        },
        {
          status: 400,
        },
      );
    }

    let character = await Character.findOne({
      userId,
    })
      .populate(characterPopulate)
      .lean();

    if (!character) {
      const createdCharacter = await Character.create({
        userId,

        name: generateRandomName(),
      });

      character = await Character.findById(createdCharacter._id)
        .populate(characterPopulate)
        .lean();
    }

    const { finalStats } = calculateCharacterStats(character);

    return NextResponse.json(
      {
        message: "Lấy hoặc tạo character thành công",
        character: {
          ...addBreakthroughInfo(character),
          finalStats,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Create/get character error:", error);

    return NextResponse.json(
      {
        message: "Lỗi máy chủ khi xử lý character",
      },
      {
        status: 500,
      },
    );
  }
}
