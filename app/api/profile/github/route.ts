import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ensureProfileForUser } from "@/lib/profiles";

export const runtime = "nodejs";
const schema = z.object({ githubUsername: z.string().trim().min(1).max(39).regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/).nullable() }).strict();
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "INVALID_GITHUB_USERNAME" }, { status: 400 });
  const profile = await ensureProfileForUser(prisma, session.user);
  await prisma.profile.update({ where: { id: profile.id }, data: { githubUsername: parsed.data.githubUsername } });
  return NextResponse.json({ githubUsername: parsed.data.githubUsername });
}
