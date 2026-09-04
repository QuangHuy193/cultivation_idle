import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";
import Map from "@/lib/models/Map";

import "@/lib/models";
import { mapRewardPopulate } from "@/lib/helper";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const character = await Character.findById(id);

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

    const currentMap = await Map.findById(character.currentMap.map);

    if (!currentMap) {
      return NextResponse.json(
        {
          message: "Không tìm thấy bản đồ hiện tại",
        },
        {
          status: 404,
        },
      );
    }

    const maps = await Map.find({
      order: {
        $gte: currentMap.order,
        $lte: currentMap.order + 4,
      },
    })
      .populate("requiredRealm")
      .populate("stages.monsterId")
      .populate(mapRewardPopulate)
      .sort({ order: 1 })
      .lean();

    const result = maps.map((map) => ({
      ...map,

      current: map._id === currentMap._id,

      unlocked: map.order <= currentMap.order + 1,

      currentStage: map._id === currentMap._id ? character.currentMap.stage : 0,
    }));

    return NextResponse.json({
      currentMapId: currentMap._id,

      currentStage: character.currentMap.stage,

      maps: result,
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
