import { TourRootType } from "@/types/tourTypes";
import { getTourApiUrl } from "./getTourApiUrl";

export const getTourListBasedLocation = async (
  x: number,
  y: number,
  r?: number,
) => {
  const params = {
    numOfRows: 10,
    _type: "json",
    pageNo: 1,
    MobileOS: "ETC",
    MobileApp: "AppTest",
    listYN: "Y",
    arrange: "A",
    mapX: x,
    mapY: y,
    radius: r || 1000,
    contentTypeId: 15,
  };
  const url = getTourApiUrl("locationBasedList1", params);
  const res = await fetch(url);
  const data: TourRootType = await res.json();
  return data.response.body.items.item;
};
