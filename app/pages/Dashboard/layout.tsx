'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(component)/DashboardSideBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-black">
          {/* Sidebar - fixed width */}
          <AppSidebar />
          
          {/* Main content area - flex-1 to take remaining space */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Optional: If you need a header/sticky trigger */}
            <SidebarTrigger />
            
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </LocalizationProvider>
  );
}