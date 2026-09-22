import { NextResponse } from "next/server";
import "@/lib/models";
import connectDB from "@/lib/db/db";
import { validateName } from "@/lib/helper";
import Character from "@/lib/models/Character";
import { CHANGE_NAME_COST_ONCE } from "@/lib/constants/numberConstants";

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

    const { name } = await request.json();

    if (!validateName(name).check) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
        },
        {
          status: 402,
        },
      );
    }

    const existingName = await Character.findOne({ name }).select("name");

    if (existingName) {
      return NextResponse.json(
        {
          message: "Tên đã tồn tại!",
        },
        {
          status: 402,
        },
      );
    }

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

    // không còn lượt miễn phí
    if (char.countChangeName > 0) {
      const costChangeName = char.countChangeName * CHANGE_NAME_COST_ONCE;
      if (costChangeName > char.spiritStone) {
        return NextResponse.json(
          {
            message: "Bạn không đủ linh thạch",
          },
          {
            status: 402,
          },
        );
      }
      char.spiritStone -= costChangeName;
    }

    char.name = name;
    char.countChangeName += 1;

    await char.save();

    return NextResponse.json({
      name,
      countChangeName: char.countChangeName,
      spiritStone: char.spiritStone,
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
