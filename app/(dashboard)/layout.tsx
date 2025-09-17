import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/unauthorized");
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
      <Analytics />
    </div>
  );
}
