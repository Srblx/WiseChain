import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getUserByMail } from "../claimResetPassword/route";

export async function POST(request: Request) {
  const { mail } = await request.json();

  try {
    const user = await getUserByMail(mail);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, pseudo: user.pseudo },
      process.env.JWT_SECRET!,
      { expiresIn: "3m" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating reset token:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
