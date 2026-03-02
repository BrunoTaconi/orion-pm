import { registerUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await registerUser(body);

  return NextResponse.json(result);
}