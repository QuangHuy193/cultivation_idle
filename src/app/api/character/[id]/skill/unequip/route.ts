import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import Character from "@/lib/models/Character";

import "@/lib/models/Skill";
import "@/lib/models/Realm";
import "@/lib/models/Equip";
import "@/lib/models/Item";

import { characterPopulate } from "@/lib/helper";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const { skillId } = await request.json();

    if (!skillId) {
      return NextResponse.json(
        {
          message: "Thiếu kỹ năng",
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

    const equippedSkill = character.equippedSkills.find(
      (skill: any) => skill.skillId === skillId,
    );

    if (!equippedSkill) {
      return NextResponse.json(
        {
          message: "Kỹ năng này chưa trang bị",
        },
        {
          status: 400,
        },
      );
    }

    character.equippedSkills =
      character.equippedSkills.filter(
        (skill: any) => skill.skillId !== skillId,
      );

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