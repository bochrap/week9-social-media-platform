import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";

export default async function ProfilePage({ params }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  //   const userData = await getUserData.json();

  console.log(userData.rows[0].username);

  return (
    <div>
      <h3>`{userData.rows[0].username}&apos;s Profile Page`</h3>
      <p>`Bio: {userData.rows[0].bio}`</p>
    </div>
  );
}
