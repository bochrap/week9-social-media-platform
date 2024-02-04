import Link from "next/link";
import AllPosts from "./allposts/page";
import Feed from "./feed/page";

export default function Home() {
  return (
    <div>
      Welcome to first social media platform for Filips <br />
      <Link href="/allposts">All posts</Link>
      <Link href="/feed">Your feed</Link>
    </div>
  );
}
