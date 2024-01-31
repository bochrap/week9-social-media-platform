import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";
import Image from "next/image";
import myImage from "@/../public/pageLogo.png";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Week9-social-network",
  description: "for TechEd",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  console.log(userId);
  const profileRes = await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserButton id="header-user-button" afterSignOutUrl="/" />
          <div id="header-main">
            <Link href="/">
              <Image id="main-logo" src={myImage} alt="Logo" />
            </Link>

            {/* <h1>Filipstagram</h1> */}
          </div>
          {profileRes.rowCount !== 0 && children}
          {profileRes.rowCount === 0 && <CreateProfile />}
          {/* {children} */}
        </body>
      </html>
    </ClerkProvider>
  );
}
