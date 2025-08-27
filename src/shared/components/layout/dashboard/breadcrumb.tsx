"use client";

import * as React from "react";
import Link from "next/link";
import { Home, SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import useBreadcrumbStore from "@/shared/stores/breadcrumb";
import PATHS from "@/shared/utils/routes";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

const ITEMS_TO_DISPLAY = 3;

export function DashboardBreadcrumb() {
  const [open, setOpen] = React.useState(false);
  const { items } = useBreadcrumbStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Always include Dashboard as the first item
  const breadcrumbItems = [
    { label: "Dashboard", href: PATHS.PROTECTED.DASHBOARD || "/dashboard" },
    ...items
  ];

  // Don't render complex responsive logic if only dashboard item exists
  if (breadcrumbItems.length === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              {breadcrumbItems[0].label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Helper function to render breadcrumb items properly
  const renderBreadcrumbItems = () => {
    const elements: React.ReactNode[] = [];

    // Always show first item (Dashboard) with home icon
    elements.push(
      <BreadcrumbItem key="dashboard">
        <BreadcrumbLink asChild>
          <Link
            href={breadcrumbItems[0].href ?? "/"}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            {/* {breadcrumbItems[0].label} */}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    // Add separator after dashboard if there are more items
    if (breadcrumbItems.length > 1) {
      elements.push(<BreadcrumbSeparator
        key="dashboard-separator"
      >
        <SlashIcon />
      </BreadcrumbSeparator>);
    }

    // Rmove first item from the list for further processing
    breadcrumbItems.shift();

    // Handle ellipsis for long breadcrumb paths
    if (breadcrumbItems.length > ITEMS_TO_DISPLAY) {
      elements.push(
        <BreadcrumbItem key="ellipsis">
          {isDesktop ? (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                className="flex items-center gap-1"
                aria-label="Toggle menu"
              >
                <BreadcrumbEllipsis className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {breadcrumbItems.slice(1, -2).map((item, index) => (
                  <DropdownMenuItem key={`dropdown-${index}`}>
                    <Link href={item.href ?? "#"}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger aria-label="Toggle Menu">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Navigasi ke</DrawerTitle>
                  <DrawerDescription>
                    Pilih halaman untuk dinavigasi.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-1 px-4">
                  {breadcrumbItems.slice(1, -2).map((item, index) => (
                    <Link
                      key={`drawer-${index}`}
                      href={item.href ?? "#"}
                      className="py-1 text-sm hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <DrawerFooter className="pt-4">
                  <DrawerClose asChild>
                    <Button variant="outline">Tutup</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </BreadcrumbItem>
      );

      elements.push(<BreadcrumbSeparator
        key="ellipsis-separator"
      >
        <SlashIcon />
      </BreadcrumbSeparator>);
    }

    // Show the last few items
    const itemsToShow = breadcrumbItems.slice(-ITEMS_TO_DISPLAY + 1);
    itemsToShow.forEach((item, index) => {
      const isLast = index === itemsToShow.length - 1;

      elements.push(
        <BreadcrumbItem key={`item-${index}`}>
          {item.href && !isLast ? (
            <BreadcrumbLink
              asChild
              className="max-w-20 truncate md:max-w-none"
            >
              <Link href={item.href}>{item.label}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
              {item.label}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
      );

      // Add separator after each item except the last one
      if (!isLast) {
        elements.push(
          <BreadcrumbSeparator key={`sep-${index}`} >
            <SlashIcon />
          </BreadcrumbSeparator>
        );
      }
    });

    return elements;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
