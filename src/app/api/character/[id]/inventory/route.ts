import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import "@/lib/models";

import {
  addBreakthroughInfo,
  calculateCharacterStats,
  characterPopulate,
} from "@/lib/helper";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id).populate(characterPopulate);

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

    const { finalStats } = calculateCharacterStats(character);

    return NextResponse.json({
      ...addBreakthroughInfo(character),
      finalStats,
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
