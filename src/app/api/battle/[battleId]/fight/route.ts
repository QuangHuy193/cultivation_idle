import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import Battle from "@/lib/models/Battle";
import Character from "@/lib/models/Character";
import "@/lib/models/Skill";
import { calculateCharacterStats } from "@/lib/helper";
import { SkillInBattle } from "@/lib/types/battleTypes";
import { SkillItemInInventory } from "@/lib/types/characterTypes";

const MAX_TURN = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ battleId: string }> },
) {
  try {
    await connectDB();

    const { battleId } = await params;

    const body = await req.json();

    const { battleType } = body;

    const battle = await Battle.findOne({ _id: battleId, battleType });

    if (!battle) {
      return NextResponse.json(
        { message: "Không tìm thấy trận đấu" },
        { status: 404 },
      );
    }

    const character = await Character.findById(battle.characterId).populate(
      "inventory.skills.skillId",
    );

    const { finalStats } = calculateCharacterStats(character);

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật" },
        { status: 404 },
      );
    }

    // clone dl
    let playerHp = battle.playerHp;

    let monsterHp = battle.monster.hp;

    const skills = battle.skills.map((s: SkillInBattle) => ({
      skillId: s.skillId,
      currentCooldown: s.currentCooldown,
    }));

    const turns = [];

    const logs = [];

    for (let turn = 1; turn <= MAX_TURN; turn++) {
      // giảm CD
      skills.forEach((skill: SkillInBattle) => {
        if (skill.currentCooldown > 0) {
          skill.currentCooldown--;
        }
      });

      // player turn
      let totalDamage = 0;

      for (const SkillInBattle of skills) {
        if (SkillInBattle.currentCooldown > 0) continue;

        const skillData = character.inventory.skills.find(
          (s: SkillItemInInventory) => s.skillId._id.toString() === SkillInBattle.skillId,
        );

        if (!skillData) continue;

        const levelData = skillData.skillId.levels.find(
          (l: SkillItemInInventory) => l.level === skillData.level,
        );

        const damage = (levelData?.attackPower * (finalStats?.atk ?? 1)) / 100;

        totalDamage += damage;

        logs.push({
          name: character.name,
          enemyName: battle.monster.name,
          dmg: damage,
          skill: skillData.skillId.name,
        });

        SkillInBattle.currentCooldown = skillData.skillId.cooldown;
      }

      // trừ máu quái
      const finalDamageOfPlay = Math.max(totalDamage - battle.monster.def, 1);

      monsterHp -= finalDamageOfPlay;

      if (monsterHp < 0) {
        monsterHp = 0;
      }

      // kiểm tra thắng
      if (monsterHp <= 0) {
        turns.push({
          turn,
          playerHp,
          monsterHp,
          logs,
        });

        battle.logs = logs;
        await battle.save();

        return NextResponse.json({
          battleStatus: "win",
          turns,
        });
      }

      // lượt quái
      const monsterDamage = battle.monster.attack || 1;

      // trừ máu player
      const finalDamgeOfMons = Math.max(
        monsterDamage - (finalStats?.def ?? 0),
        1,
      );

      playerHp -= finalDamgeOfMons;

      if (playerHp < 0) {
        playerHp = 0;
      }

      logs.push({
        name: battle.monster.name,
        enemyName: character.name,
        damage: monsterDamage,
      });

      // lưu turn
      turns.push({
        turn,
        playerHp,
        monsterHp,
        logs,
      });

      // kiểm tra thua
      if (playerHp <= 0) {
        battle.logs = logs;
        await battle.save();
        return NextResponse.json({
          battleStatus: "lose",
          turns,
        });
      }
    }

    battle.logs = logs;

    await battle.save();
    
    return NextResponse.json({
      battleStatus: "lose",
      reason: "max_turn",
      turns,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
