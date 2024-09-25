import AdminLayout from "@/components/admin/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Access",
  description: "this is a prime featured page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex w-full">
      <AdminLayout />
      <div >{children}</div>
    </main>
  );
}
