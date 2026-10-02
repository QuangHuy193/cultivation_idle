import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";
import Sprout from "@/lib/models/Sprout";

export async function GET() {
  try {
    await connectDB();

    const sprouts = await Sprout.find();

    if (!sprouts) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bất kì linh căn nào",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      sprouts,
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
