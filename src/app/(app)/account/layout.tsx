import UserLayout from "@/components/user/UserLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Access",
  description: "this is a prime featured page for  users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex min-w-full">
      <div className="w-1/5">
        <UserLayout />
      </div>

      <div className="px-6 py-5 w-4/5 ">{children}</div>
    </main>
  );
}
