import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";
import Mailbox from "@/lib/models/Mailbox";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const mails = await Mailbox.find({ characterId: id });

    return NextResponse.json({
      mails,
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
