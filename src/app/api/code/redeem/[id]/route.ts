import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models/User";
import Code from "@/lib/models/Code";
import CodeRedeem from "@/lib/models/CodeRedeem";
import Character from "@/lib/models/Character";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const { code, characterId } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Vui lòng nhập mã." },
        { status: 400 },
      );
    }

    const foundCode = await Code.findOne({
      name: code.toUpperCase().trim(),
    });

    if (!foundCode) {
      return NextResponse.json(
        { message: "Mã không tồn tại." },
        { status: 404 },
      );
    }

    if (foundCode.expire < new Date()) {
      return NextResponse.json({ message: "Mã đã hết hạn." }, { status: 400 });
    }

    if (
      foundCode.maxUses !== null &&
      foundCode.usedCount >= foundCode.maxUses
    ) {
      return NextResponse.json(
        { message: "Mã đã hết lượt sử dụng." },
        { status: 400 },
      );
    }

    const redeemed = await CodeRedeem.findOne({
      codeId: foundCode._id,
      userId: id,
    });

    if (redeemed) {
      return NextResponse.json(
        { message: "Bạn đã sử dụng mã này rồi." },
        { status: 400 },
      );
    }

    const character = await Character.findOne({ _id: characterId });

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật." },
        { status: 404 },
      );
    }

    // ===== Cộng thưởng =====
    character.spiritStone += foundCode.reward.spiritStone;
    character.cultivation += foundCode.reward.cultivation;

    // Items
    for (const rewardItem of foundCode.reward.items) {
      const existed = character.inventory.items.find(
        (item: any) => item.itemId.toString() === rewardItem.itemId.toString(),
      );

      if (existed) {
        existed.quantity += rewardItem.quantity;
      } else {
        character.inventory.items.push({
          itemId: rewardItem.itemId,
          quantity: rewardItem.quantity,
        });
      }
    }

    // Equips
    for (const rewardEquip of foundCode.reward.equips) {
      for (let i = 0; i < rewardEquip.quantity; i++) {
        character.inventory.equips.push({
          equipId: rewardEquip.equipId,
        });
      }
    }

    await character.save();

    // ===== Lưu lịch sử đổi mã =====

    await CodeRedeem.create({
      codeId: foundCode._id,
      userId: id,
    });

    // ===== Tăng số lần dùng =====

    foundCode.usedCount += 1;
    await foundCode.save();

    return NextResponse.json({
      success: true,
      message: "Đổi mã thành công.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
