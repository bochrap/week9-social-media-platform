import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function GetUserPosts({ params }) {
  const post =
    await sql`SELECT posts.id, posts.content, posts.profile_id, posts.date, profiles.username  FROM posts INNER JOIN profiles ON profiles.id = posts.profile_id WHERE posts.id = ${params.postId}`;

  console.log(params);
  console.log(post.rows);

  if (!post.rows[0]) {
    notFound();
  }

  return (
    <div>
      <h3>User posts</h3>
      <div id="post-container">
        <p>
          <Link href={`/user/${post.rows[0].profile_id}/posts`} id="plink">
            {post.rows[0].username}{" "}
          </Link>
          posted on {new Date(post.rows[0].date).toLocaleString()}
        </p>
        <p>{post.rows[0].content}</p>
      </div>
    </div>
  );
}
