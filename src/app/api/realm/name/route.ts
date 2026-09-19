import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import "@/lib/models";
import Realm from "@/lib/models/Realm";

export async function GET() {
  try {
    await connectDB();

    const realms = await Realm.find().select("_id name order").lean()

    return NextResponse.json({
      realms,
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
