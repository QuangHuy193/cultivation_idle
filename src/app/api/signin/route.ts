import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import connectDB from "@/lib/db/db";
import User from "@/lib/models/User";

function hashPassword(password: string) {
  return createHash("sha256")
    .update(password)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "Vui lòng nhập đầy đủ email và mật khẩu",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findOne({
      email,
      password: hashPassword(password),
    }).lean();

    if (!user) {
      return NextResponse.json(
        {
          message: "Email hoặc mật khẩu không đúng",
        },
        {
          status: 401,
        },
      );
    }

    const { password: _, ...safeUser } = user;

    const jwtSecret =
      process.env.JWT_SECRET ||
      process.env.SECRET ||
      "dev-secret";

    const token = jwt.sign(
      {
        sub: user._id.toString(),
      },
      jwtSecret,
      {
        algorithm: "HS256",
      },
    );

    return NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: {
          ...safeUser,
          _id: user._id.toString(),
        },
        token,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Signin error:", error);

    return NextResponse.json(
      {
        message: "Lỗi máy chủ khi đăng nhập",
      },
      {
        status: 500,
      },
    );
  }
}