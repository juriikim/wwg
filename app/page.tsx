"use client";
import SideBar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import KakaoMap from "@/components/layout/kakaoMap";
import { TourItemType } from "@/types/tourTypes";
import { useState } from "react";

export default function Home() {
  const [tourList, setTourList] = useState<TourItemType[] | "">("");
  const [currentAddress, setCurrentAddress] = useState("");
  return (
    <div>
      <SidebarProvider>
        <SideBar tourList={tourList} currentAddress={currentAddress} />
        <div className="flex w-full flex-col">
          <Header />
          <main className="grow">
            <KakaoMap
              tourList={tourList}
              setTourList={setTourList}
              setCurrentAddress={setCurrentAddress}
            />
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
