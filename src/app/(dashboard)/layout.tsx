import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider className="bg-gradient-to-br from-gray-900 via-black to-gray-900">   
        <DashboardSidebar/>
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
