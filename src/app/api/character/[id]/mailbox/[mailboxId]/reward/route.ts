import { NextResponse } from "next/server";
import "@/lib/models";
import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import Mailbox from "@/lib/models/Mailbox";
import { characterPopulate, checkHasReward, grantRewards } from "@/lib/helper";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; mailboxId: string }>;
  },
) {
  try {
    await connectDB();

    const { id, mailboxId } = await params;

    const character = await Character.findById(id);

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật" },
        { status: 404 },
      );
    }

    const mailbox = await Mailbox.findById(mailboxId);

    if (!mailbox) {
      return NextResponse.json({ message: "Không tìm thư" }, { status: 404 });
    }

    if (mailbox.status === 2) {
      return NextResponse.json(
        { message: "Bạn đã nhận quà rồi" },
        { status: 402 },
      );
    }

    const hasReward = checkHasReward(mailbox.reward);

    if (!hasReward) {
      return NextResponse.json(
        { message: "Thư này không có quàf" },
        { status: 402 },
      );
    }

    await grantRewards(character, mailbox.reward);

    character.markModified("inventory");

    await character.save();

    // cập nhật mail
    mailbox.status = 2;
    await mailbox.save();

    const charRes = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      character: charRes,
      mailbox,
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
