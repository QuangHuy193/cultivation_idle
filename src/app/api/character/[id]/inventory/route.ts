import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import "@/lib/models/Equip";
import "@/lib/models/Item";
import "@/lib/models/Skill";

import { equipmentPopulate } from "@/lib/helper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id)
      .populate(equipmentPopulate)
      .populate("inventory.equips.equipId")
      .populate("inventory.items.itemId")
      .populate("inventory.skills.skillId")
      .lean();

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

    const finalStats = {
      hp: character.stats.hp,
      attack: character.stats.attack,
      defense: character.stats.defense,
    };

    Object.values(character.equipments ?? {}).forEach((equip: any) => {
      if (!equip) return;

      finalStats.hp += equip.stats?.hp ?? 0;
      finalStats.attack += equip.stats?.attack ?? 0;
      finalStats.defense += equip.stats?.defense ?? 0;
    });

    return NextResponse.json({
      equipments: character.equipments,
      finalStats,
      inventory: character.inventory,
    });
    
  } catch (error) {
    console.error("Get inventory error:", error);

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
