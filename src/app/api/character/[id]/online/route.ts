import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import "@/lib/models";
import { calculateCharacterCultivationPerMinute } from "@/lib/helper";
import { MAX_TIME_OFFLINE } from "@/lib/constants/numberConstants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id).lean();

    if (!character) {
      return NextResponse.json(
        {
          message: "Không tìm thấy nhân vật",
        },
        {
          status: 404,
        },
      );
    }

    // tổng tu vi / phút
    const cultivationPerMinute = calculateCharacterCultivationPerMinute(
      character.cultivationPerMinute,
    );

    const now = Date.now();

    const lastOnline = new Date(character.lastOnlineAt).getTime();

    // số phút offline/online từ lần cập nhật trước
    let minutesPassed = Math.floor((now - lastOnline) / (1000 * 60));

    const timeReawrdOffline = character.timeReawrdOffline;

    // trừ đi số thưởng offline chưa nhận
    if (timeReawrdOffline >= MAX_TIME_OFFLINE) {
      minutesPassed = 0;
    } else if (minutesPassed + timeReawrdOffline >= MAX_TIME_OFFLINE) {
      minutesPassed = MAX_TIME_OFFLINE - timeReawrdOffline;
    }

    const cultivationOffline = minutesPassed * minutesPassed;

    await Character.updateOne(
      { _id: id },
      {
        $inc: {
          cultivationOffline,
          timeReawrdOffline: minutesPassed,
        },
        $set: {
          lastOnlineAt: new Date(now),
        },
      },
    );

    const character2 = await Character.findById(id).lean();

    return NextResponse.json({
      cultivationOffline: character2.cultivationOffline,

      timeReawrdOffline: character2.timeReawrdOffline,
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
