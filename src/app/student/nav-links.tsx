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
import { Home, Calendar, ClipboardList, Award, User } from "lucide-react";

const links = [
  { href: "/student", label: "Dashboard", icon: Home },
  { href: "/student/events", label: "All Events", icon: Calendar },
  { href: "/student/registrations", label: "My Registrations", icon: ClipboardList },
  { href: "/student/certificates", label: "My Certificates", icon: Award },
  { href: "/student/profile", label: "My Profile", icon: User },
];

export function StudentNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/student" className="flex items-center gap-2 font-bold text-xl text-sidebar-foreground">
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
                isActive={pathname === link.href || (link.href !== "/student" && pathname.startsWith(link.href))}
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
