import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider className="bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <DashboardNavbar />
          <div className="flex pt-15">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
