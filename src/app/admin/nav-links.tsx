"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { LayoutDashboard, CalendarPlus, Users } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarPlus },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-sidebar-foreground">
          <Icons.logo className="w-7 h-7 text-primary" />
          <span className="text-lg font-headline">CampusConnect</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))}
                className="justify-start"
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
