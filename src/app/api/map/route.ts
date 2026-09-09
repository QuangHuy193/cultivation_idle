import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Map from "@/lib/models/Map";

import "@/lib/models";
import { mapPopulate } from "@/lib/helper";

export async function GET() {
  try {
    await connectDB();

    const maps = await Map.find()
      .populate("requiredRealm")
      .populate(mapPopulate)
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({
      maps,
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
