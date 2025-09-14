import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth0 } from "@/lib/auth0";
import prisma from "@/prisma/db";
import addUserToDb from "./actions";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth0.getSession();
  // console.log({ session });

  // if (session) {
  //   const email = session?.user?.email;

  //   const dbUser = await prisma.user.findFirst({
  //     where: { email: { equals: email } },
  //   });

  //   if (dbUser) {
  //     redirect("/dashboard/addRecipe");
  //   } else {
  //     await addUserToDb(email!);
  //     redirect("/dashboard/addRecipe");
  //   }
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
