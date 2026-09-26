import { NextResponse } from "next/server";
import "@/lib/models";
import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import { characterPopulate, grantRewards } from "@/lib/helper";
import DailyLogin from "@/lib/models/DailyLogin";

export async function POST(
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

    const char = await Character.findById(id);

    if (!char) {
      return NextResponse.json(
        {
          message: "Người dùng không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    if (
      new Date(char.dailyLogin.lastClaimAt).getDate() === new Date().getDate()
    ) {
      return NextResponse.json(
        {
          message: "Bạn đã nhận quà hôm nay rồi!",
        },
        {
          status: 402,
        },
      );
    }

    const dailyLogin = await DailyLogin.findById("daily_login");

    await grantRewards(
      char,
      dailyLogin.days[char.dailyLogin.rewardDay - 1].reward,
    );

    char.dailyLogin.rewardDay += 1;
    char.dailyLogin.total += 1;
    char.dailyLogin.lastClaimAt = new Date();

    await char.save();

    const character = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      character,
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
