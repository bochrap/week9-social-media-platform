import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params, children }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  //   const userData = await getUserData.json();
  // console.log(userData);

  if (!userData.rows[0]) {
    notFound();
  }

  return (
    <div>
      {/* <h3>`{userData.rows[0].username}&apos;s Profile Page`</h3>
      <p>`Bio: {userData.rows[0].bio}`</p> */}
      {/* <SeparatorDemo username={userData.rows[0].username} bio={userData.rows[0].bio} params={params} /> */}
      {/* <div> {children}</div> */}
    </div>
  );
}
