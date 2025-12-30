import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { users } from "@/lib/data";
import { StudentNav } from "./nav-links";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = users.find(u => u.role === 'student' && u.id === 'user1'); // Mock current user

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <StudentNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <DashboardHeader
            user={{
              name: currentUser.name,
              email: currentUser.email,
              avatar: `https://avatar.vercel.sh/${currentUser.email}.png`,
              initials: currentUser.name.charAt(0),
              role: 'student',
            }}
          />
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
