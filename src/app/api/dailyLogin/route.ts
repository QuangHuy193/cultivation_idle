import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";

import DailyLogin from "@/lib/models/DailyLogin";

export async function GET() {
  try {
    await connectDB();

    const dailyLogins = await DailyLogin.find({ active: true });

    return NextResponse.json({
      dailyLogins,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
