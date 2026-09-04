import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import Battle from "@/lib/models/Battle";
import Character from "@/lib/models/Character";
import "@/lib/models/Skill";
import { calculateCharacterStats } from "@/lib/helper";
import Map from "@/lib/models/Map";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ battleId: string }> },
) {
  try {
    await connectDB();

    const { battleId } = await params;

    const battle = await Battle.findOne({ _id: battleId });

    if (!battle) {
      return NextResponse.json(
        { message: "Không tìm thấy trận đấu" },
        { status: 404 },
      );
    }

    const map = await Map.findOne({ _id: battle.mapId });

    return NextResponse.json({
      message: "test",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
