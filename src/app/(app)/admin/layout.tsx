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
    <main className="min-h-screen flex min-w-full">
      <div className="w-1/5">
        <AdminLayout />
      </div>

      <div className="px-6 py-5 w-4/5">{children}</div>
    </main>
  );
}
