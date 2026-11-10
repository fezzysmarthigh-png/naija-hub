import { auth } from "@/auth";
import Post from "./post";
import { redirect } from "next/navigation";

export default async function ServerPage() {
  const session = await auth();

  // If unauthenticated, redirect directly on the server to the sign-in page
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-dvh bg-slate-50 py-6">
      
     <Post session={session}/>
    </main>
  );
}