import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/db";

import "@/lib/models";

import Code from "@/lib/models/Code";
import CodeRedeem from "@/lib/models/CodeRedeem";
import Character from "@/lib/models/Character";
import {
  addBreakthroughInfo,
  calculateCharacterStats,
  characterPopulate,
  grantRewards,
} from "@/lib/helper";
import Mailbox from "@/lib/models/Mailbox";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const { code, characterId } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Vui lòng nhập mã." },
        { status: 400 },
      );
    }

    const foundCode = await Code.findOne({
      name: code.toUpperCase().trim(),
    });

    if (!foundCode) {
      return NextResponse.json(
        { message: "Mã không tồn tại." },
        { status: 404 },
      );
    }

    if (foundCode.expire < new Date()) {
      return NextResponse.json({ message: "Mã đã hết hạn." }, { status: 400 });
    }

    if (
      foundCode.maxUses !== null &&
      foundCode.usedCount >= foundCode.maxUses
    ) {
      return NextResponse.json(
        { message: "Mã đã hết lượt sử dụng." },
        { status: 400 },
      );
    }

    const redeemed = await CodeRedeem.findOne({
      codeId: foundCode._id,
      userId: id,
    });

    if (redeemed) {
      return NextResponse.json(
        { message: "Bạn đã sử dụng mã này rồi." },
        { status: 400 },
      );
    }

    const character = await Character.findOne({ _id: characterId });

    if (!character) {
      return NextResponse.json(
        { message: "Không tìm thấy nhân vật." },
        { status: 404 },
      );
    }

    // ===== Lưu lịch sử đổi mã =====
    await CodeRedeem.create({
      codeId: foundCode._id,
      userId: id,
    });

    // ===== Tăng số lần dùng =====
    foundCode.usedCount += 1;
    await foundCode.save();

    // tạo mailbox
    const insertId = await Mailbox.insertOne({
      characterId: new mongoose.Types.ObjectId(character._id),
      title: `Phần thưởng từ mã quà ${code}`,
      reward: foundCode.reward,
    });

    const newMailbox = await Mailbox.findById(insertId);

    return NextResponse.json({
      success: true,
      message: "Đổi mã thành công.",
      newMailbox,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
