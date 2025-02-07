"use client";
import SideBar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import KakaoMap from "@/components/layout/kakaoMap";
import { TourItemType } from "@/types/tourTypes";
import { useState } from "react";

export interface TourParamType {
  lat: number;
  lng: number;
  r: number;
  page: number;
  rows: number;
}

export default function Home() {
  const [tourList, setTourList] = useState<TourItemType[] | "">("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [tourParam, setTourParam] = useState<TourParamType>({
    lat: 0,
    lng: 0,
    r: 1000,
    page: 0,
    rows: 15,
  });

  return (
    <div>
      <SidebarProvider>
        <SideBar
          tourList={tourList}
          currentAddress={currentAddress}
          tourParam={tourParam}
          setTourList={setTourList}
          setTourParam={setTourParam}
        />
        <div className="flex w-full flex-col">
          <Header />
          <main className="grow">
            <KakaoMap
              tourList={tourList}
              setTourList={setTourList}
              setCurrentAddress={setCurrentAddress}
              tourParam={tourParam}
              setTourParam={setTourParam}
            />
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
