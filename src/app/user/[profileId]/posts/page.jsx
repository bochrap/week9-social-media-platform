import { sql } from "@vercel/postgres";

export default async function GetUserPosts({ params }) {
  const userPosts = await sql`SELECT * FROM posts WHERE profile_id = ${params.profileId}`;

  return (
    <div>
      <h3>User posts</h3>
      {userPosts.rows.map((post) => (
        <div key={post.date} id="post-container">
          {console.log(post.date)}
          <p>User posted on {new Date(post.date).toLocaleString()}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
