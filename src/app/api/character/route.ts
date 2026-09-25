import { NextResponse } from "next/server";

import Character from "@/lib/models/Character";
import "@/lib/models";
import {
  addBreakthroughInfo,
  calculateCharacterStats,
  characterPopulate,
} from "@/lib/helper";
import connectDB from "@/lib/db/db";
import Map from "@/lib/models/Map";
import Mailbox from "@/lib/models/Mailbox";

function generateRandomName() {
  const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);

  return `user${randomSuffix}`;
}

// lấy, tạo nhân vật
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
      // khởi tạo map 1
      const mapId = await Map.findOne({ order: 1 }).select("_id");

      // tạo nhân vật mới
      const createdCharacter = await Character.create({
        userId,

        name: generateRandomName(),

        currentMap: {
          map: mapId,
          stage: 1,
        },
      });

      // tạo quà tân thủ vào thư
      await Mailbox.create({
        characterId: createdCharacter._id,
        title: "Quà tặng tân thủ",
        content: `Chào mừng bạn đến với thế giới tu tiên, chúng tôi có 1 phần quà nhỏ giành cho bạn, chúc bạn vui vẻ với hành trình tu luyện của bản thân.`,
        status: 0,
        reward: {
          spiritStone: 1000,
          cultivation: 0,
          items: [],
          equips: [],
          skills: [],
          skins: [],
        },
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
