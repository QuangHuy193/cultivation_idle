import { NextResponse } from "next/server";
import "@/lib/models";
import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import { calculateCharacterStats, characterPopulate } from "@/lib/helper";
import Class from "@/lib/models/Class";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; classId: string }>;
  },
) {
  try {
    await connectDB();

    const { id, classId } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Thiếu nhân vật",
        },
        {
          status: 400,
        },
      );
    }

    if (!classId) {
      return NextResponse.json(
        {
          message: "Thiếu hệ phái",
        },
        {
          status: 400,
        },
      );
    }

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

    const cls = await Class.findById(classId);

    if (!cls) {
      return NextResponse.json(
        {
          message: "Không tìm hệ phái này",
        },
        {
          status: 404,
        },
      );
    }

    if (character.class.classId === "khong") {
      character.class.classId = classId;
      character.class.classLevelCharacter = 1;

      character.stats.class.atk = cls.levels?.[0]?.buffs?.atk;
      character.stats.class.hp = cls.levels?.[0]?.buffs?.hp;
      character.stats.class.def = cls.levels?.[0]?.buffs?.def;
    } else {
      return NextResponse.json(
        {
          message: "Bạn đã có hệ phái rồi",
        },
        {
          status: 404,
        },
      );
    }

    await character.save();

    const charRes = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      finalStats: calculateCharacterStats(character).finalStats,
      class: charRes.class,
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
