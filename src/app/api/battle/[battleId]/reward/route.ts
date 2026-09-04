import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import Battle from "@/lib/models/Battle";
import Character from "@/lib/models/Character";
import "@/lib/models/Skill";
import { calculateCharacterStats, mapPopulate, rollChance } from "@/lib/helper";
import Map from "@/lib/models/Map";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ battleId: string }> },
) {
  try {
    await connectDB();

    const { battleId } = await params;

    const battle = await Battle.findOne({ _id: battleId });

    if (!battle) {
      return NextResponse.json(
        { message: "Không tìm thấy trận đấu" },
        { status: 404 },
      );
    }

    const map = await Map.findOne({ _id: battle.mapId })
      .populate(mapPopulate)
      .lean();

    if (!map) {
      return NextResponse.json(
        { message: "Không tìm thấy bản đồ của trận đấu" },
        { status: 404 },
      );
    }

    const monster = map.stages[battle.stage - 1].monsterId;

    //console.log("map", map);
    const stage = map.stages[battle.stage - 1];

    let realmReward = 0;
    let spiritStoneReward = 0;

    // tính tu vi
    // tu vi từ map
    realmReward += stage.firstClearReward.cultivation;
    // tu vi từ quái nhân với hệ số map
    realmReward += monster.realmReward * map.monsterRewardMultiplier;

    // tính đá linh thạch
    // đá linh thạch từ map
    if (rollChance(stage.firstClearReward.rewards.spiritStone.chance)) {
      spiritStoneReward += stage.firstClearReward.rewards.spiritStone.amount;
    }
    // đá linh thạch từ quái nhân với hệ số map
    if (rollChance(monster.droppable.spiritStone.chance)) {
      spiritStoneReward +=
        monster.droppable.spiritStone.amount * map.monsterRewardMultiplier;
    }

    return NextResponse.json({
      data: {
        realmReward,
        spiritStoneReward,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
