import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";
import Mailbox from "@/lib/models/Mailbox";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ mailboxId: string }>;
  },
) {
  try {
    await connectDB();

    const { mailboxId } = await params;

    const mail = await Mailbox.findById(mailboxId);

    if (!mail) {
      return NextResponse.json(
        {
          message: "Không tìm thấy mail!",
        },
        { status: 404 },
      );
    }

    if (mail.status === 0) {
      mail.status = 1;
      await mail.save();
    }

    return NextResponse.json({
      mail,
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
