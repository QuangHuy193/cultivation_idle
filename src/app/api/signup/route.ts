import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { getDb } from "@/lib/db/db";

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

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

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Mật khẩu phải có ít nhất 8 ký tự" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    const existingUser = await users.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 409 },
      );
    }

    const result = await users.insertOne({
      email,
      password: hashPassword(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        userId: result.insertedId.toString(),
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
