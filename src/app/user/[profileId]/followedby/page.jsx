import { sql } from "@vercel/postgres";
import Link from "next/link";
// import { auth } from "@clerk/nextjs";

export default async function Followedby({ params }) {
  //   console.log(currentUserId.rows[0].id);
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  console.log(userData.rows[0].username);

  //GET LIST OF CURRENT USERS FOLLOWS
  //   const usersFollows = await sql`SELECT * FROM follows WHERE follower_id = ${params.profileId}`;
  const usersFollowers = await sql`SELECT follows.follower_id, follows.followee_id, profiles.username
FROM follows
JOIN profiles ON follows.follower_id = profiles.id
WHERE follows.followee_id = ${params.profileId};`;
  console.log(usersFollowers);

  return (
    <div>
      <h3>This user is followed by:</h3>
      {usersFollowers.rows.map((follow) => (
        <Link key={follow.follower_id} href={`/user/${follow.follower_id}/posts`}>
          <p>{follow.username}</p>
          <br />
        </Link>
      ))}
    </div>
  );
}
