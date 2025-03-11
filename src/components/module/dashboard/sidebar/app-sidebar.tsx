"use client";

import * as React from "react";
import {
  BookOpen,
  School,
  Shield,
  ShieldUser,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useUser } from "@/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Filter navigation based on user role
  const getFilteredNavItems = () => {
    // Base items that everyone can see
    const baseItems = [
      {
        title: "Dashboard",
        url: "",
        icon: SquareTerminal,
        isActive: true,
      },
    ];

    // Role-specific sections
    const roleSections = {
      student: [
        {
          title: "student section",
          url: "",
          icon: ShieldUser,
          items: [
            {
              title: "Student Profile",
              url: "/dashboard/student/profile",
            },
            {
              title: "Booking Tutor",
              url: "/dashboard/student/booking",
            },
            {
              title: "Payment",
              url: "/dashboard/student/payment",
            },
          ],
        },
      ],
      admin: [
        {
          title: "Admin section",
          url: "",
          icon: Shield,
          items: [
            {
              title: "Manage User",
              url: "/dashboard/admin/user",
            },
          ],
        },
      ],
      tutor: [
        {
          title: "Tutor section",
          url: "",
          icon: School,
          items: [
            {
              title: "Tutor Profile",
              url: "/dashboard/tutor/profile",
            },
            {
              title: "Manage Booking",
              url: "/dashboard/tutor/booking",
            },
          ],
        },
      ],
    };

    // Add role-specific sections if user has that role
    if (user && user.role && roleSections[user.role]) {
      return [...baseItems, ...roleSections[user.role]];
    }

    return baseItems;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex text-left text-sm leading-tight">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold tracking-tight">
                    TutorLink
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getFilteredNavItems()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
