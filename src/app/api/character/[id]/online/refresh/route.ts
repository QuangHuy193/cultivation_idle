import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import "@/lib/models";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id);

    character.lastOnlineAt = new Date(Date.now());

    await character.save();

    return NextResponse.json({
      message: "...",
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
