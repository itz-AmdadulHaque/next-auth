"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "../components/UserCard";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // making the page only accessible by admin or manager, 
  // not using it becaue we are handling it using middleware
  // if (session?.user.role !== "admin"
  //     && session?.user.role !== "manager") {
  //     return <h1 className="text-5xl">Access Denied</h1>
  // }
  
  // for avoiding typescript error if there is no user in session
  if (!session?.user) return;
  
  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Client"} />
    </section>
  );
}
