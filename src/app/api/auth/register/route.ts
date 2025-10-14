// app/api/auth/register/route.ts - PARA REGISTRO
import { UserService } from "@/app/services/userProfilesService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password } = await request.json();

    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const registerResult = await UserService.registerUser({
      first_name,
      last_name,
      email,
      password
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: registerResult.user,
      profile: registerResult.profile
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}