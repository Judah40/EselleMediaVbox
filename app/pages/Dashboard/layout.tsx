'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./(component)/DashboardSideBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-black  flex flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </LocalizationProvider>
  );
}
