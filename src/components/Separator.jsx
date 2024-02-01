"use client";

import React from "react";
import * as Separator from "@radix-ui/react-separator";
import "../app/globals.css";
import Link from "next/link";

const SeparatorDemo = ({ username, bio, params }) => (
  <div style={{ width: "100%", maxWidth: 300, margin: "0 15px" }}>
    <div className="Text" style={{ fontWeight: 500 }}>
      {username}&apos;s Profile Page
    </div>
    <div className="Text">{bio}</div>
    <Separator.Root className="SeparatorRoot" style={{ margin: "15px 0" }} />
    <div style={{ display: "flex", height: 20, alignItems: "center" }}>
      <div className="Text">
        <Link href={`/user/${params.profileId}/posts`}>Posts</Link>
      </div>
      <Separator.Root className="SeparatorRoot" decorative orientation="vertical" style={{ margin: "0 15px" }} />
      <div className="Text">
        <Link href={`/user/${params.profileId}/following`}>Followed users</Link>
      </div>
      <Separator.Root className="SeparatorRoot" decorative orientation="vertical" style={{ margin: "0 15px" }} />
      <div className="Text">
        <Link href={`/user/${params.profileId}/followedby`}>Followed by</Link>
      </div>
    </div>
  </div>
);

export default SeparatorDemo;
