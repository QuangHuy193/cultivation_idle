import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import Skin from "@/lib/models/Skin";

import "@/lib/models"

export async function GET() {
  try {
    await connectDB();

    const skins = await Skin.find();

    if (!skins) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bất kì trang phục nào",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      skins
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
