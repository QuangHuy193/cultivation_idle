import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";

import "@/lib/models/Skill";
import "@/lib/models/Item";
import "@/lib/models/Equip";
import "@/lib/models/Realm";

import { characterPopulate } from "@/lib/helper";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const { skillId, slot } = await request.json();

    if (!skillId || !slot) {
      return NextResponse.json(
        {
          message: "Thiếu skillId hoặc slot",
        },
        {
          status: 400,
        },
      );
    }

    if (slot < 1 || slot > 4) {
      return NextResponse.json(
        {
          message: "Slot không hợp lệ",
        },
        {
          status: 400,
        },
      );
    }

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

    // kiểm tra có sở hữu skill không
    const ownedSkill = character.inventory.skills.find(
      (skill: any) => skill.skillId === skillId,
    );

    if (!ownedSkill) {
      return NextResponse.json(
        {
          message: "Bạn chưa sở hữu kỹ năng này",
        },
        {
          status: 400,
        },
      );
    }

    // slot đã có skill
    const occupiedSlot = character.equippedSkills.find(
      (skill: any) => skill.slot === slot,
    );

    if (occupiedSlot) {
      return NextResponse.json(
        {
          message: "Slot đã có kỹ năng",
        },
        {
          status: 400,
        },
      );
    }
    
    // Nếu skill này đang ở slot khác thì gỡ trước
    character.equippedSkills = character.equippedSkills.filter(
      (skill: any) => skill.skillId !== skillId,
    );

    // Nếu slot đã có skill thì gỡ skill cũ
    character.equippedSkills = character.equippedSkills.filter(
      (skill: any) => skill.slot !== slot,
    );

    // Trang bị skill mới
    character.equippedSkills.push({
      skillId,
      slot,
    });

    await character.save();

    const updatedCharacter = await Character.findById(id)
      .populate(characterPopulate)
      .lean();

    return NextResponse.json(updatedCharacter);
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
