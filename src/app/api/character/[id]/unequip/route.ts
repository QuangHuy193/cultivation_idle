import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import { calculateCharacterStats, characterPopulate } from "@/lib/helper";
import { VALID_SLOTS } from "@/lib/constants";



export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const { slot } = await request.json();

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

    const equippedItemId = character.equipments?.[slot];

    if (!equippedItemId) {
      return NextResponse.json(
        {
          message: "Ô trang bị đang trống",
        },
        {
          status: 400,
        },
      );
    }

    character.inventory.equips.push({
      equipId: equippedItemId,
    });

    character.equipments[slot] = undefined;

    await character.save();

    const updatedCharacter = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    if (!updatedCharacter) {
      throw new Error("Character not found after save");
    }

    const { finalStats } = calculateCharacterStats(updatedCharacter);

    return NextResponse.json({
      //message: "Gỡ trang bị thành công",
      equipments: updatedCharacter.equipments,
      inventory: updatedCharacter.inventory,
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
