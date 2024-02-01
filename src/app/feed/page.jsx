import { sql } from "@vercel/postgres";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Feed() {
  const { userId } = auth();

  //GET CURRENT USER ID
  const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

  console.log(currentUserId.rows[0].id);

  //   const getFeedPosts =
  //     await sql`SELECT posts.id, posts.content, posts.profile_id, posts.date, profiles.username  FROM posts INNER JOIN profiles ON profiles.id = posts.profile_id ORDER BY date DESC`;

  const getFeedPosts = await sql`SELECT 
    posts.content,
    posts.profile_id,
    profiles.username,
    posts.date,
    follows.followee_id
FROM 
    posts
JOIN 
    follows ON posts.profile_id = follows.follower_id
JOIN 
    profiles ON follows.followee_id = profiles.id
WHERE 
    follows.follower_id = ${currentUserId.rows[0].id}
ORDER BY 
    posts.date DESC;`;

  return (
    <div>
      <h3>All posts from followed users</h3>
      {getFeedPosts.rows.map((post) => (
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
