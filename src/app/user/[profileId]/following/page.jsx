import { sql } from "@vercel/postgres";
import Link from "next/link";
// import { auth } from "@clerk/nextjs";

export default async function Following({ params }) {
  //   const { userId } = auth();

  //   //GET CURRENT USER ID
  //   const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  //GET LIST OF CURRENT USERS FOLLOWS
  const usersFollows = await sql`SELECT follows.follower_id, follows.followee_id, profiles.username
FROM follows
JOIN profiles ON follows.followee_id = profiles.id
WHERE follows.follower_id = ${params.profileId};`;

  return (
    <div>
      <h3>This user is following:</h3>
      {usersFollows.rows.map((follow) => (
        <Link key={follow.followee_id} href={`/user/${follow.followee_id}/posts`}>
          <p>{follow.username}</p>
          <br />
        </Link>
      ))}
    </div>
  );
}
