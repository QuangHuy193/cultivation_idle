import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import "@/lib/models";
import { hashPassword, validateDataAuthForm } from "@/lib/helper";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 },
      );
    }

    if (!validateDataAuthForm({ email, password }).check) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 409 },
      );
    }

    const result = await User.insertOne({
      email,
      password: hashPassword(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        userId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Lỗi máy chủ khi đăng ký" },
      { status: 500 },
    );
  }
}
