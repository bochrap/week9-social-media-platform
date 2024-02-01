import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function AllPosts() {
  const getAllPosts =
    await sql`SELECT posts.id, posts.content, posts.profile_id, posts.date, profiles.username  FROM posts INNER JOIN profiles ON profiles.id = posts.profile_id ORDER BY date DESC`;

  return (
    <div>
      <h3>All posts</h3>
      {getAllPosts.rows.map((post) => (
        <Link id="post-link" key={post.date} href={`/user/${post.profile_id}/posts/${post.id}`}>
          <div key={post.date} id="post-container">
            {console.log(post.date)}
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
