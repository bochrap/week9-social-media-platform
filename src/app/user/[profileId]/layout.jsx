import SeparatorDemo from "@/components/Separator";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import FollowButton from "@/components/FollowButton";

export default async function UserpageLayout({ children, params }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;
  const userPosts = await sql`SELECT * FROM posts WHERE profile_id = ${params.profileId}`;
  const userFollows = await sql`SELECT * FROM follows WHERE follower_id = ${params.profileId}`;

  const userFollowers = await sql`SELECT * FROM follows WHERE followee_id = ${params.profileId}`;

  if (!userData.rows[0]) {
    notFound();
  }
  return (
    <div id="userpage-content">
      <div id="username-separator">
        {userId === userData.rows[0].clerk_user_id ? null : <FollowButton params={params} userData={userData} userId={userId} />}
        <SeparatorDemo
          username={userData.rows[0].username}
          bio={userData.rows[0].bio}
          params={params}
          postsCount={userPosts.rows.length}
          userFollows={userFollows.rows.length}
          userFollowers={userFollowers.rows.length}
        />
      </div>
      <div id="userpage-children">{children}</div>
    </div>
  );
}
