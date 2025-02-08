import SideBar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import KakaoMap from "@/components/layout/kakaoMap";

export default function Home() {
  return (
    <div>
      <SidebarProvider>
        <SideBar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="grow">
            <KakaoMap />
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
