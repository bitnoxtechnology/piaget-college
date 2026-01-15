"use client";

import { useState } from "react";
import { ChevronRight, EllipsisIcon, LogOut, PanelLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignoutDialog from "@/components/dialog/SignoutDialog";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { dashboardRoutes } from "@/lib/routes";
import SiteLogo from "../SiteLogo";
import { Link, useLocation } from "react-router-dom";

function AppSidebar() {
  const location = useLocation();
  const { pathname } = location;

  const { toggleSidebar, setOpenMobile: setSidebarOpenMobile } = useSidebar();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" className="border-r min-h-screen p-6!">
        <SidebarHeader className="pt-0! bg-card">
          <div className="flex h-15 gap-2 items-center justify-between">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <SiteLogo showRightLogo />
            </div>

            <div className="flex justify-center group-data-[collapsible=icon]:w-full">
              <PanelLeft
                onClick={() => toggleSidebar()}
                className="text-muted-foreground cursor-pointer hover:text-foreground w-5 h-5"
              />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-card">
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground">
              Navigations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dashboardRoutes.map((item) => {
                  const isActive =
                    (pathname.includes(item.route) && item.route.length > 1) ||
                    pathname === item.route;

                  return item.subMenu ? (
                    <Collapsible key={item.label} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              "hover:bg-accent! hover:text-accent-foreground! active:bg-[initial] font-bold text-muted-foreground p-6!",
                              {
                                "bg-accent! hover:bg-accent! text-accent-foreground!":
                                  isActive,
                              }
                            )}
                          >
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronRight className="ml-auto size-4 text-muted-foreground group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="ml-3!">
                          <SidebarMenuSub className="pl-1! mt-1">
                            {item.subMenuItems.map((subItem) => {
                              const isSubActive = pathname === subItem.route;

                              return (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuButton
                                    onClick={() => setSidebarOpenMobile(false)}
                                    className={cn(
                                      "hover:bg-accent hover:text-accent-foreground! active:bg-[initial] font-bold text-muted-foreground !p-5",
                                      {
                                        "bg-secondary! hover:bg-accent! text-secondary-foreground!":
                                          isSubActive,
                                      }
                                    )}
                                    asChild
                                    isActive={isSubActive}
                                  >
                                    <Link to={subItem.route}>
                                      <span>{subItem.label}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        onClick={() => setSidebarOpenMobile(false)}
                        className={cn(
                          "hover:bg-accent hover:text-accent-foreground! active:bg-[initial] font-bold text-muted-foreground !p-6",
                          {
                            "bg-secondary! hover:bg-accent! text-accent-foreground!":
                              isActive,
                          }
                        )}
                        asChild
                        isActive={isActive}
                      >
                        <Link to={item.route}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-card">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="hover:bg-secondary!" asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="hover:bg-accent text-muted-foreground!"
                  >
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarFallback className="rounded-full border-2 border-border bg-secondary text-secondary-foreground capitalize">
                        <span className="capitalize">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                        </span>
                        <span className="capitalize">
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold capitalize">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <EllipsisIcon className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 border-none rounded-lg bg-card text-card-foreground"
                  side={"bottom"}
                  align="start"
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={() => setIsOpen(true)}
                    className="hover:bg-accent! hover:text-accent-foreground!"
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SignoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default AppSidebar;
