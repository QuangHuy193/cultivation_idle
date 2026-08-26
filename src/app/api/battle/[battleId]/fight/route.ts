import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";

import Battle from "@/lib/models/Battle";
import Character from "@/lib/models/Character";
import "@/lib/models/Skill";
import { calculateCharacterStats } from "@/lib/helper";

const MAX_TURN = 30;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ battleId: string }> },
) {
  try {
    await connectDB();

    const { battleId } = await params;

    const battle = await Battle.findById(battleId);

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

    const skills = battle.skills.map((s: any) => ({
      skillId: s.skillId,
      currentCooldown: s.currentCooldown,
    }));

    const turns = [];

    for (let turn = 1; turn <= MAX_TURN; turn++) {
      // giảm CD
      skills.forEach((skill) => {
        if (skill.currentCooldown > 0) {
          skill.currentCooldown--;
        }
      });

      const logs = [];

      // player turn
      let totalDamage = 0;

      for (const battleSkill of skills) {
        if (battleSkill.currentCooldown > 0) continue;

        const skillData = character.inventory.skills.find(
          (s: any) => s.skillId._id.toString() === battleSkill.skillId,
        );

        if (!skillData) continue;

        const levelData = skillData.skillId.levels.find(
          (l: any) => l.level === skillData.level,
        );

        const damage = (levelData?.attackPower * (finalStats?.atk ?? 1)) / 100;

        totalDamage += damage;

        logs.push({
          name: character.name,
          enemyName: battle.monster.name,
          damage,
          skill: skillData.skillId.name,
        });

        battleSkill.currentCooldown = skillData.skillId.cooldown;
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

        return NextResponse.json({
          battleStatus: "win",
          turns,
        });
      }

      // lượt quái
      const monsterDamage = battle.monster.attack || 1;

      // trừ máu player
      const finalDamgeOfMons = Math.max(monsterDamage - finalStats.def, 1);

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
        return NextResponse.json({
          battleStatus: "lose",
          turns,
        });
      }
    }

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
