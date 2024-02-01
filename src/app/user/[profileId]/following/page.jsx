import { sql } from "@vercel/postgres";
// import { auth } from "@clerk/nextjs";

export default async function Following({ params }) {
  //   const { userId } = auth();

  //   //GET CURRENT USER ID
  //   const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

  //   console.log(currentUserId.rows[0].id);

  //GET LIST OF CURRENT USERS FOLLOWS
  const usersFollows = await sql`SELECT * FROM follows WHERE follower_id = ${params.profileId}`;
  console.log(usersFollows);

  return (
    <div>
      <h3>This user is following:</h3>
    </div>
  );
}
