import "@/app/globals.css";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function FollowButton({ params, userData, userId }) {
  //GET CURRENT USER ID
  const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

  //GET LIST OF CURRENT USERS FOLLOWS
  //   const usersFollows = await sql`SELECT * FROM follows WHERE follower_id = ${currentUserId.rows[0].id}`;

  let isFollowing = await sql`SELECT EXISTS (
        SELECT 1
        FROM follows
        WHERE followee_id = ${params.profileId}
    ) AS value_exists`;

  //   async function handleFollow() {
  //     "use server";
  //     console.log(isFollowing.rows[0].value_exists);
  //     revalidatePath(`/user/${params.profileId}`);
  //   }

  //SET INITIAL VALUE FOR BUTTONS TEXT
  let text = "";
  if (isFollowing.rows[0].value_exists === true) {
    text = "UNFOLLOW";
  } else {
    text = "FOLLOW";
  }

  async function handleFollow() {
    "use server";
    console.log(isFollowing.rows[0].value_exists);
    if (isFollowing.rows[0].value_exists === true) {
      await sql`DELETE FROM follows WHERE follower_id = ${currentUserId.rows[0].id} AND followee_id = ${params.profileId}`;
      console.log("UNFOLLOWED");
    } else {
      await sql`INSERT INTO follows (follower_id, followee_id) VALUES (${currentUserId.rows[0].id}, ${params.profileId})`;
      console.log("FOLLOWED");
    }
    revalidatePath(`/user/${params.profileId}`);
  }

  return (
    <form action={handleFollow}>
      <button className="follow-btn-follow">{text}</button>
    </form>
  );
}
