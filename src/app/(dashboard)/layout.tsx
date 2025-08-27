import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Separator } from '@/shared/components/ui/separator';
import UserProvider from '@/shared/providers/user';
import React from 'react';
import { DashboardBreadcrumb } from '@/shared/components/layout/dashboard/breadcrumb';
import { AppSidebar } from '@/shared/components/layout/dashboard/sidebar';

const DashboardLayout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 z-10">
            <SidebarTrigger />
            <div>
              <Separator orientation="vertical" className="!h-5" />
            </div>
            <div className="flex-1 ml-2">
              <DashboardBreadcrumb />
            </div>
          </header>

          <div className="flex flex-1 flex-col">
            <main className="@container/main flex flex-1 flex-col gap-2 p-4">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider >
  );
};

export default DashboardLayout;
