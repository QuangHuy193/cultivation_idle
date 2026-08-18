import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import Realm from "@/lib/models/Realm";

import "@/lib/models/Equip";
import "@/lib/models/Item";
import "@/lib/models/Skill";

import {
  calculateCharacterStats,
  characterPopulate,
} from "@/lib/helper";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id);

    if (!character) {
      return NextResponse.json(
        {
          message: "Không tìm thấy nhân vật",
        },
        {
          status: 404,
        },
      );
    }

    const currentRealm = await Realm.findById(
      character.realmId,
    );

    if (!currentRealm) {
      return NextResponse.json(
        {
          message: "Không tìm thấy cảnh giới",
        },
        {
          status: 404,
        },
      );
    }

    // Kiểm tra đủ tu vi chưa
    if (
      character.cultivation <
      currentRealm.cultivationRequired
    ) {
      return NextResponse.json(
        {
          message: "Chưa đủ tu vi đột phá",
        },
        {
          status: 400,
        },
      );
    }

    // Trừ tu vi
    character.cultivation -=
      currentRealm.cultivationRequired;

    // Tăng tầng trong cảnh giới
    if (
      character.realmLevel <
      currentRealm.maxLevel
    ) {
      character.realmLevel += 1;

      await character.save();
    } else {
      // Sang cảnh giới mới
      const nextRealm = await Realm.findOne({
        order: currentRealm.order + 1,
      });

      if (!nextRealm) {
        return NextResponse.json(
          {
            message:
              "Đã đạt cảnh giới cao nhất",
          },
          {
            status: 400,
          },
        );
      }

      character.realmId = nextRealm._id;
      character.realmLevel = 1;

      await character.save();
    }

    const updatedCharacter =
      await Character.findById(id)
        .populate(characterPopulate)
        .lean();

    if (!updatedCharacter) {
      return NextResponse.json(
        {
          message:
            "Không tìm thấy nhân vật sau khi cập nhật",
        },
        {
          status: 404,
        },
      );
    }

    const { finalStats } =
      calculateCharacterStats(updatedCharacter);

    const realm =
      updatedCharacter.realmId as any;

    return NextResponse.json({
      ...updatedCharacter,

      finalStats,

      breakthroughRequired:
        realm?.cultivationRequired ?? 0,

      canBreakthrough:
        updatedCharacter.cultivation >=
        (realm?.cultivationRequired ?? Infinity),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Lỗi máy chủ",
      },
      {
        status: 500,
      },
    );
  }
}