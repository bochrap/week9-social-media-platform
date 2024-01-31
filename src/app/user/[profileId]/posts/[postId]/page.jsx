import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function GetUserPosts({ params }) {
  const post = await sql`SELECT * FROM posts WHERE id = ${params.postId}`;
  console.log(params);
  console.log(post.rows);

  if (!post.rows[0]) {
    notFound();
  }

  return (
    <div>
      <h3>User posts</h3>
      <div id="post-container">
        <p>User posted on {new Date(post.rows[0].date).toLocaleString()}</p>
        <p>{post.rows[0].content}</p>
      </div>
    </div>
  );
}
