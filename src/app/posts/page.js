"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// import { getServerSession } from "next-auth/next";
// import { authoptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
const PostsPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("api/auth/signin?callback=/dashboard");
    },
  });
  //   const session = await getServerSession(authoptions);
  //   if (!session) {
  //     redirect("/api/auth/signin?callbackUrl=/dashboard");
  //   }
  //   console.log(session);
  return (
    <div>{status !== "authenticated" ? <p>Not auth</p> : <p>welcome </p>}</div>
  );
};

export default PostsPage;
