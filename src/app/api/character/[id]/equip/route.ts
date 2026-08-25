import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import { calculateCharacterStats, characterPopulate } from "@/lib/helper";
import { VALID_SLOTS } from "@/lib/constants";
import Equip from "@/lib/models/Equip";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const { equipId, slot } = await request.json();

    if (!VALID_SLOTS.includes(slot)) {
      return NextResponse.json(
        {
          message: "Slot không hợp lệ",
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

    // tìm trang bị trong túi
    const equipIndex = character.inventory.equips.findIndex(
      (item) => item.equipId?.toString() === equipId,
    );

    if (equipIndex === -1) {
      return NextResponse.json(
        {
          message: "Không tìm thấy trang bị trong túi",
        },
        {
          status: 404,
        },
      );
    }

    // nếu slot đã có đồ
    const oldEquip = character.equipments?.[slot];

    if (oldEquip) {
      character.inventory.equips.push({
        equipId: oldEquip,
      });
    }

    // trang bị đồ mới
    character.equipments[slot] = equipId;

    const equip = await Equip.findOne({ _id: equipId });

    // cập nhật chỉ số trang bị
    character.stats.equips.atk += equip.stats.atk;
    character.stats.equips.hp += equip.stats.hp;
    character.stats.equips.def += equip.stats.def;

    // xóa khỏi túi
    character.inventory.equips.splice(equipIndex, 1);

    await character.save();

    const updatedCharacter = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    if (!updatedCharacter) {
      throw new Error("Character not found after save");
    }

    const { finalStats } = calculateCharacterStats(updatedCharacter);

    return NextResponse.json({
      ...updatedCharacter,
      finalStats,
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
