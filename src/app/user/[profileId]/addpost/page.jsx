import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default function AddPost({ params }) {
  async function handleAddPost(formData) {
    "use server";

    const { userId } = auth();
    const currentUserId = await sql`SELECT id FROM profiles WHERE clerk_user_id = ${userId}`;

    const content = formData.get("content");

    await sql`INSERT INTO posts (content, profile_id, date) VALUES (${content}, ${currentUserId.rows[0].id}, CURRENT_TIMESTAMP)`;
    revalidatePath(`/user/${params.profileId}/posts`);
    redirect(`/user/${params.profileId}/posts`);
  }

  return (
    <form action={handleAddPost} id="add-post-form">
      <h4>Add a new post</h4>
      <textarea name="content" placeholder="What's on your mind?" required></textarea>
      <button>Submit</button>
    </form>
  );
}
