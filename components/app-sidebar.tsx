import {
  Calendar,
  Search,
  CookingPot,
  Newspaper,
  UserRound,
  ChefHat,
  LogOutIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  {
    title: "Latest news",
    url: "#",
    icon: Newspaper,
  },
  {
    title: "Add a recipe",
    url: "#",
    icon: ChefHat,
  },
  {
    title: "My recipes",
    url: "#",
    icon: CookingPot,
  },
  {
    title: "Plan for the week",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search recipe ideas",
    url: "#",
    icon: Search,
  },
];

const bottomItems = [
  {
    title: "Profile",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Log Out",
    url: "/auth/logout",
    icon: LogOutIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex h-full flex-col">
        {/* top menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/logo.png" alt="PlanToEat logo" />
              <AvatarFallback>PT</AvatarFallback>
            </Avatar>
            <span className="text-base font-semibold">PlanToEat</span>
          </SidebarGroupLabel>
          <div className="py-6">
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>

        <div className="mt-auto" />

        {/* bottom menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Separator />
            <SidebarMenu className="flex flex-col gap-4">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
