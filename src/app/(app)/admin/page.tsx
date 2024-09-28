"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Detail</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl mb-2">Welcome, {session.user.username}</h2>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>User ID:</strong> {session.user._id}
          </p>
        </div>
        <div className="mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
  return <div>You are not authorized to view this page.</div>;
}
