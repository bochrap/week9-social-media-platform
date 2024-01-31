import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function GetUserPosts({ params }) {
  const userPosts = await sql`SELECT * FROM posts WHERE profile_id = ${params.profileId}`;
  console.log(params);

  return (
    <div>
      <h3>User posts</h3>
      {userPosts.rows.map((post) => (
        <Link id="post-link" key={post.date} href={`/user/${params.profileId}/posts/${post.id}`}>
          <div key={post.date} id="post-container">
            {console.log(post.date)}
            <p>User posted on {new Date(post.date).toLocaleString()}</p>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
