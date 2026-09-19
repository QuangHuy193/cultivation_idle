import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import "@/lib/models";
import { addBreakthroughInfo, characterPopulate } from "@/lib/helper";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id);

    character.cultivation += character.cultivationOffline;

    character.cultivationOffline = 0;

    character.timeReawrdOffline = 0;

    await character.save();

    const charRes = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    const { breakthroughRequired, canBreakthrough } =
      addBreakthroughInfo(charRes);

    return NextResponse.json({
      cultivation: charRes.cultivation,
      breakthroughRequired,
      canBreakthrough,

      cultivationOffline: 0,
      timeReawrdOffline: 0,
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
