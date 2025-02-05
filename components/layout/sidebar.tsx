import Link from "next/link";
import Image from "next/image";
import { LocateFixed } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { TourItemType } from "@/types/tourTypes";
import rectangleImg from "@/asset/rectangle.png";

interface SideBarProps {
  tourList: TourItemType[] | "";
  currentAddress: string;
}

export default function SideBar({ tourList, currentAddress }: SideBarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="sticky top-0 z-10 bg-white px-4 py-7 shadow-md">
          <strong className="flex text-xl">
            <LocateFixed />
            <span className="pl-2">{currentAddress}</span>
          </strong>
          <p>주변 관광지 목록을 확인해 보세요!</p>
        </SidebarHeader>
        <SidebarGroup>
          {/* <SidebarGroupLabel>주변 관광지</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
