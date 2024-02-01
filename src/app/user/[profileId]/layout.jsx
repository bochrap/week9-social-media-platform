import SeparatorDemo from "@/components/Separator";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import FollowButton from "@/components/FollowButton";

export default async function UserpageLayout({ children, params }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  //   const userData = await getUserData.json();
  console.log("userData", userData);
  console.log("userId", userId);
  console.log("clerk_user_id", userData.rows[0].clerk_user_id);

  if (!userData.rows[0]) {
    notFound();
  }
  return (
    <div id="userpage-content">
      <div id="username-separator">
        {userId === userData.rows[0].clerk_user_id ? null : <FollowButton />}
        {/* <FollowButton /> */}
        <SeparatorDemo username={userData.rows[0].username} bio={userData.rows[0].bio} params={params} />
      </div>
      <div id="userpage-children">{children}</div>
    </div>
  );
}
