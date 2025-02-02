import Main from "@/components/layout/main";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <main>
      <SidebarProvider>
        <Main />
        <SidebarTrigger />
      </SidebarProvider>
    </main>
  );
}
