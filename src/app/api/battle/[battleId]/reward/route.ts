import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import "@/lib/models";

import Battle from "@/lib/models/Battle";
import Character from "@/lib/models/Character";
import "@/lib/models/Skill";
import {
  addBreakthroughInfo,
  characterPopulate,
  grantRewards,
  mapPopulate,
  rollChance,
} from "@/lib/helper";
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

    const stage = map.stages[battle.stage - 1];

    let realmReward = 0;
    let spiritStoneReward = 0;

    // tính tu vi
    // tu vi từ map
    realmReward += stage.firstClearReward.cultivation;
    // tu vi từ quái nhân với hệ số map
    realmReward += monster.realmReward * map.monsterRewardMultiplier;

    // tính đá linh thạch
    // đá linh thạch từ quái nhân với hệ số map
    if (rollChance(stage.firstClearReward.rewards.spiritStone.chance)) {
      spiritStoneReward += stage.firstClearReward.rewards.spiritStone.amount;
    }
    // đá linh thạch từ quái nhân với hệ số map
    if (rollChance(monster.droppable.spiritStone.chance)) {
      spiritStoneReward +=
        monster.droppable.spiritStone.amount * map.monsterRewardMultiplier;
    }

    // lấy character
    const character = await Character.findById(battle.characterId);

    // cập nhật character
    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật" },
        { status: 404 },
      );
    }

    // nhật thưởng
    await grantRewards(character, {
      cultivation: realmReward,
      spiritStone: spiritStoneReward,

      items: stage.firstClearReward.rewards.items,
      equips: stage.firstClearReward.rewards.equips,
      skills: stage.firstClearReward.rewards.skills,
      skins: stage.firstClearReward.rewards.skins,
    });

    // cập nhật map
    if (character.currentMap.stage < map.maxStage) {
      character.currentMap.stage += 1;
    } else {
      const nextMap = await Map.findOne({ order: map.order + 1 });
      if (nextMap) {
        character.currentMap.map = nextMap._id;
        character.currentMap.stage = 1;
      }
    }

    await character.save();

    const charRes = await Character.findById(battle.characterId)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json({
      character: {
        currentMap: charRes.currentMap,
        cultivation: character.cultivation,
        spiritStone: character.spiritStone,
        canBreakthrough: addBreakthroughInfo(charRes).canBreakthrough,
        breakthroughRequired: addBreakthroughInfo(charRes).breakthroughRequired,
      },

      rewards: {
        equips: stage.firstClearReward.rewards.equips,
        skins: stage.firstClearReward.rewards.skins,
        skills: stage.firstClearReward.rewards.skills,
        items: stage.firstClearReward.rewards.items,
        realmReward,
        spiritStoneReward,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
