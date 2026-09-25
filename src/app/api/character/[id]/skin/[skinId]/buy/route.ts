import { ICharacter } from "./../../../../../../../lib/models/Character";
import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import "@/lib/models";
import Character from "@/lib/models/Character";
import Skin from "@/lib/models/Skin";
import { calculateCharacterStats, characterPopulate } from "@/lib/helper";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; skinId: string }> },
) {
  try {
    await connectDB();

    const { id, skinId } = await params;

    if (!id) {
      return NextResponse.json({ message: "Thiếu nhân vật" }, { status: 404 });
    }

    const character = await Character.findById(id);

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật" },
        { status: 404 },
      );
    }

    if (!skinId) {
      return NextResponse.json(
        { message: "Thiếu trang phục" },
        { status: 404 },
      );
    }

    const skin = await Skin.findById(skinId);

    if (!skin) {
      return NextResponse.json(
        { message: "Không tìm thấy trang phục" },
        { status: 404 },
      );
    }

    const isHasSkin = character.inventory.skins.find(
      (sk: ICharacter["inventory"]["skins"][number]) => sk.skinId === skinId,
    );

    if (isHasSkin) {
      return NextResponse.json(
        { message: "Bạn đã có trang phục này rồi" },
        { status: 404 },
      );
    }

    if (skin.price.unity === "linhthach") {
      if (character.spiritStone < skin.price.number) {
        return NextResponse.json(
          { message: "Bạn không đủ linh thạch mua trang phục này" },
          { status: 404 },
        );
      }
      character.inventory.skins.push({ skinId });
      character.spiritStone -= skin.price.number;
      character.stats.skins.atk += skin.buffs.atk;
      character.stats.skins.hp += skin.buffs.hp;
      character.stats.skins.def += skin.buffs.def;
    } else {
      // mua bằng tiền,...
    }

    await character.save();

    const charRes = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      inventory: charRes.inventory,
      spiritStone: charRes.spiritStone,
      finalStats: calculateCharacterStats(character).finalStats,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
