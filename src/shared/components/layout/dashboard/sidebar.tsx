"use client";

import {
  ChevronUpIcon,
  ChevronRightIcon,
  Home,
  Inbox,
  LogOutIcon,
  Mail,
  User2Icon,
  Send,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import Link from "next/link";
import { useState } from "react";
import PATHS from "@/shared/utils/routes";
import useUserStore from "@/shared/stores/user";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { cn } from "@/lib/cn";
import BrandingIcon from "../../branding/branding-icon";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Surat",
    url: "/dashboard/mail",
    icon: Mail,
    children: [
      {
        title: "Surat Masuk",
        url: PATHS.PROTECTED.MAIL_INCOMING,
        icon: Inbox,
      },
      {
        title: "Surat Keluar",
        url: PATHS.PROTECTED.MAIL_OUTGOING,
        icon: Send,
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useUserStore();
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader className="pt-5 px-4 flex items-center gap-3">
        <BrandingIcon size={32} className="rounded-md" />
        <p className="font-bold text-sidebar-foreground">Unit Pengelola Zakat KPAD</p>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    // Menu dengan submenu menggunakan Collapsible
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          )}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRightIcon
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              openItems.includes(item.title) && "rotate-90"
                            )}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="CollapsibleContent">
                        <SidebarMenu className="ml-4 py-2 border-l border-sidebar-border/50">
                          {item.children.map((sub) => (
                            <SidebarMenuItem key={sub.title}>
                              <SidebarMenuButton
                                asChild
                                className={cn(
                                  "pl-4 text-sm text-sidebar-foreground/70",
                                  "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                                  "border-l-2 border-transparent hover:border-sidebar-accent"
                                )}
                              >
                                <Link href={sub.url} onClick={handleLinkClick}>
                                  <sub.icon className="h-4 w-4" />
                                  <span>{sub.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    // Menu biasa tanpa submenu
                    <SidebarMenuButton asChild>
                      <Link href={item.url} onClick={handleLinkClick}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2Icon />
                  <span className="truncate">{user?.nickname || "-"}</span>
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-48">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={PATHS.PROTECTED.USER} onClick={handleLinkClick}>
                    <User2Icon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={PATHS.PROTECTED.LOGOUT} onClick={handleLinkClick}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
