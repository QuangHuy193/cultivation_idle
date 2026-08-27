import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";
import Class from "@/lib/models/Class";

export async function GET() {
  try {
    await connectDB();

    const classes = await Class.find();

    if (!classes) {
      return NextResponse.json(
        { message: "Không tìm thấy danh sách hệ phái." },
        { status: 400 },
      );
    }

    return NextResponse.json({ classes });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
