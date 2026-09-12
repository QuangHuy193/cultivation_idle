import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import "@/lib/models";
import Character from "@/lib/models/Character";
import Skin from "@/lib/models/Skin";
import { characterPopulate } from "@/lib/helper";

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
      (sk) => sk.skinId === skinId,
    );

    if (!isHasSkin) {
      return NextResponse.json(
        { message: "Bạn chưa có trang phục này" },
        { status: 404 },
      );
    }

    character.skinId = skinId;

    await character.save();

    const charRes = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      skinId: charRes.skinId,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
