import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export default async function Home() {
  const { userId } = auth();
  const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

  return (
    <div id="home-content">
      <p>Welcome to first social media platform for Filips</p>
      <p>
        Explore <Link href="/allposts">All posts</Link>
      </p>
      <p>
        Say something yourself <Link href={`/user/${currentUserId.rows[0].id}/addpost`}>xx</Link>
      </p>
      <p>
        Or visit your profile page <Link href={`/user/${currentUserId.rows[0].id}`}>xx</Link>
      </p>
    </div>
  );
}
