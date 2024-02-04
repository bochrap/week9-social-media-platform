import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function GetUserPosts({ params }) {
  const userPosts =
    await sql`SELECT posts.id, posts.content, posts.profile_id, posts.date, profiles.username  FROM posts INNER JOIN profiles ON profiles.id = posts.profile_id  WHERE profile_id = ${params.profileId} ORDER BY date DESC`;

  return (
    <div>
      <h3>User posts</h3>
      {userPosts.rows.map((post) => (
        <Link id="post-link" key={post.date} href={`/user/${params.profileId}/posts/${post.id}`}>
          <div key={post.date} id="post-container">
            <p>
              {post.username} posted on {new Date(post.date).toLocaleString()}
            </p>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
