import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import Character from "@/lib/models/Character";
import Battle from "@/lib/models/Battle";
import Monster from "@/lib/models/Monster";
import "@/lib/models/Map";
import "@/lib/models/Skill";
import { calculateCharacterStats } from "@/lib/helper";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ characterId: string }> },
) {
  try {
    await connectDB();

    const { characterId } = await params;

    // lấy nhân vật
    const character = await Character.findById(characterId)
      .populate("currentMap.map")
      .populate("inventory.skills.skillId");

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

    // lấy map từ char
    const currentMap = character.currentMap?.map;

    if (!currentMap) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bản đồ",
        },
        {
          status: 400,
        },
      );
    }

    // random quái
    const randomIndex = Math.floor(Math.random() * currentMap.monsters.length);

    const monsterId = currentMap.monsters[randomIndex].monsterId;

    // lấy thông tin quái
    const monster = await Monster.findById(monsterId);

    if (!monster) {
      return NextResponse.json(
        {
          message: "Không tìm thấy quái",
        },
        {
          status: 404,
        },
      );
    }

    // xóa dữ liệu cũ (chưa làm tiếp tục)
    await Battle.deleteMany({
      characterId,
    });

    // khởi tạo CD
    const battleSkills =
      character.equippedSkills?.map((skill: any) => ({
        skillId: skill.skillId,
        currentCooldown: 0,
      })) || [];

    const { finalStats } = calculateCharacterStats(character);

    // tạo battle
    const battle = await Battle.create({
      characterId,

      mapId: currentMap._id,

      stage: character.currentMap.stage,

      turn: 1,

      playerHp: finalStats?.hp ?? 1,
      playerMaxHp: finalStats?.hp ?? 1,

      monster: {
        monsterId: monster._id,

        name: monster.name,

        hp: monster.stats.hp,

        maxHp: monster.stats.hp,

        attack: monster.stats.atk,

        defense: monster.stats.def,

        icon: monster.icon,
      },

      skills: battleSkills,

      battleStatus: "fighting",

      logs: [],
    });

    return NextResponse.json({
      success: true,
      battle,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Lỗi server",
      },
      {
        status: 500,
      },
    );
  }
}
