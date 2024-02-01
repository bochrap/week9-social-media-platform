import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddPost({ params }) {
  async function handleAddPost(formData) {
    "use server";

    const content = formData.get("content");

    await sql`INSERT INTO posts (content, profile_id, date) VALUES (${content}, ${params.profileId}, CURRENT_TIMESTAMP)`;
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
