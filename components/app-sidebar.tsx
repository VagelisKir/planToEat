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
    url: "/dashboard/addRecipe",
    icon: ChefHat,
  },
  {
    title: "My recipes",
    url: "/dashboard/myRecipes",
    icon: CookingPot,
  },
  {
    title: "Plan for the week",
    url: "/dashboard/planForWeek",
    icon: Calendar,
  },
  {
    title: "Search recipe ideas",
    url: "/dashboard/searchRecipeIdeas",
    icon: Search,
  },
];

const bottomItems = [
  {
    title: "Profile",
    url: "/dashboard/profile",
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
            <div className="flex items-center gap-1 px-2">
              <ChefHat />
              <span className="text-base font-semibold">PlanToEat</span>
            </div>
          </SidebarGroupLabel>
          <div className="py-1 px-3 border-b">
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-1">
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
