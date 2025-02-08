"use client";
import Link from "next/link";
import Image from "next/image";
import { LocateFixed } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import rectangleImg from "@/asset/rectangle.png";
import { useInView } from "react-intersection-observer";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TourParamType } from "@/app/page";
import { getTourListBasedLocation } from "@/lib/getTourListBasedLocation";
import { useTourListStore } from "@/store/useTourListStore";

interface SideBarProps {
  currentAddress: string;
  tourParam: TourParamType;
  setTourParam: Dispatch<SetStateAction<TourParamType>>;
}

export default function SideBar({
  currentAddress,
  tourParam,
  setTourParam,
}: SideBarProps) {
  const tourList = useTourListStore((state) => state.tourList);
  const addTourList = useTourListStore((state) => state.addTourList);

  const { ref: divRef, inView: divInView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    const fetch = async () => {
      const copy = tourParam;
      copy.page = tourParam.page + 1;
      setTourParam(copy);
      const data = await getTourListBasedLocation(copy);
      if (data) {
        addTourList(data);
      }
    };

    if (divInView) {
      if (tourList.length > 0) {
        fetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divInView]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="sticky top-0 z-10 bg-white px-4 py-7 shadow-md">
          <strong className="flex text-xl">
            <LocateFixed />
            <span className="pl-2">{currentAddress}</span>
          </strong>
          <p>주변 관광지를 확인해 보세요!</p>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="min-h-screen">
              {Array.isArray(tourList) &&
                tourList.map((tour, index) => (
                  <SidebarMenuItem key={index} className="border-b">
                    <Link
                      href={`detali/${tour.contentid}`}
                      className="flex h-32 w-full rounded-md border px-2 py-4 transition-all hover:shadow-inner"
                    >
                      <Image
                        className="rounded-md"
                        src={tour.firstimage || rectangleImg}
                        width={120}
                        height={100}
                        alt="image"
                      ></Image>
                      <div className="py-2 pl-2">
                        <strong className="text-lg">{tour.title}</strong>
                        <p>{tour.addr1}</p>
                      </div>
                    </Link>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem ref={divRef} className="h-40"></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
