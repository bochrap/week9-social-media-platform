import SeparatorDemo from "@/components/Separator";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function UserpageLayout({ children, params }) {
  const { userId } = auth();
  const userData = await sql`SELECT * FROM profiles WHERE id = ${params.profileId}`;

  //   const userData = await getUserData.json();
  console.log("userData", userData);

  if (!userData.rows[0]) {
    notFound();
  }
  return (
    <div id="userpage-content">
      <div id="username-separator">
        <SeparatorDemo username={userData.rows[0].username} bio={userData.rows[0].bio} params={params} />
      </div>
      <div id="userpage-children">{children}</div>
    </div>
  );
}
