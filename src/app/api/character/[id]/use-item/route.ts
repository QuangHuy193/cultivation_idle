import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character, { ICharacter } from "@/lib/models/Character";
import Item from "@/lib/models/Item";
import {
  addBreakthroughInfo,
  calculateCharacterStats,
  characterPopulate,
  consumableItemToCharacter,
} from "@/lib/helper";
import "@/lib/models";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const { itemId } = await request.json();

    const character = await Character.findById(id);

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật" },
        { status: 404 },
      );
    }

    const inventoryItem = character.inventory.items.find(
      (item: ICharacter["inventory"]["items"][number]) =>
        item.itemId.toString() === itemId,
    );

    if (!inventoryItem) {
      return NextResponse.json(
        { message: "Không có vật phẩm này" },
        { status: 400 },
      );
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return NextResponse.json(
        { message: "Không tìm thấy vật phẩm" },
        { status: 404 },
      );
    }

    // gọi hàm sử dụng riêng cho từng vật phẩm
    await consumableItemToCharacter(character, item);

    // ===== Trừ vật phẩm =====
    inventoryItem.quantity -= 1;

    if (inventoryItem.quantity <= 0) {
      const index = character.inventory.items.findIndex(
        (item: ICharacter["inventory"]["items"][number]) =>
          item.itemId.toString() === itemId,
      );

      if (index !== -1) {
        character.inventory.items.splice(index, 1);
      }
    }

    await character.save();

    const updatedCharacter = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    const { finalStats } = calculateCharacterStats(updatedCharacter);

    return NextResponse.json({
      ...addBreakthroughInfo(updatedCharacter),
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
