// app/api/users/route.ts
/*import { UserService} from "@/app/services/userProfilesService";
import { User } from "lucide-react";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET() {
  try {
    const profiles = await UserService.getAllProfiles();
    const users = await UserService.getAllUsers();
    const artisans = await UserService.getAllArtisans();
    return NextResponse.json([users, profiles,artisans]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newUser = await UserService.fixDataInconsistency();
        return NextResponse.json(newUser, { status: 201 });
    }
 catch (error) {
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    );
}
}
*/