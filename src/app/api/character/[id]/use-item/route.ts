import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import Item from "@/lib/models/Item";
import { addBreakthroughInfo, characterPopulate } from "@/lib/helper";

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
      (item: any) => item.itemId.toString() === itemId,
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

    // ===== Buff chỉ số =====

    character.stats.hp += item.buff?.statBonus?.hp || 0;

    character.stats.attack += item.buff?.statBonus?.attack || 0;

    character.stats.defense += item.buff?.statBonus?.defense || 0;

    // ===== Buff tu vi =====

    character.cultivation += item.buff?.realmBonus?.realm || 0;

    // ===== Trừ vật phẩm =====
    inventoryItem.quantity -= 1;

    if (inventoryItem.quantity <= 0) {
      const index = character.inventory.items.findIndex(
        (item: any) => item.itemId.toString() === itemId,
      );

      if (index !== -1) {
        character.inventory.items.splice(index, 1);
      }
    }

    await character.save();

    const updatedCharacter = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    const characterWithBreakthroughInfo = addBreakthroughInfo(updatedCharacter);

    return NextResponse.json({
      cultivation: updatedCharacter.cultivation,
      stats: updatedCharacter.stats,
      inventory: updatedCharacter.inventory,
      breakthroughRequired: characterWithBreakthroughInfo.breakthroughRequired,
      canBreakthrough: characterWithBreakthroughInfo.canBreakthrough,
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
