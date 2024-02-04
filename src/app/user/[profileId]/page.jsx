import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params, children }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  if (!userData.rows[0]) {
    notFound();
  }

  return <div></div>;
}
