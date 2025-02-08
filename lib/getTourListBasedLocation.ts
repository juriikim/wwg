import { TourRequestType } from "@/types/apiRequestTypes";
import { getTourApiUrl } from "./getTourApiUrl";
import { TourResponseType } from "@/types/tourTypes";

/** 파라미터로 준 위치 주변의 관광지 정보를 구하는 함수입니다.
 * @param lat 위도
 * @param lng 경도
 * @param r 반경
 * @param page 페이지 번호
 * @param rows 개수
 * @returns TourItemResponseType[] | undefined
 */
export const getTourListBasedLocation = async (params: {
  lat: number;
  lng: number;
  r?: number | undefined;
  page: number;
  rows: number;
}) => {
  const requestParams: TourRequestType = {
    numOfRows: params.rows,
    _type: "json",
    pageNo: params.page,
    MobileOS: "ETC",
    MobileApp: "AppTest",
    listYN: "Y",
    arrange: "A",
    mapX: params.lng,
    mapY: params.lat,
    radius: params.r || 1000,
    contentTypeId: 15,
  };
  const url = getTourApiUrl("locationBasedList1", requestParams);
  const res = await fetch(url);
  const data: TourResponseType = await res.json();
  return data.response.body.items.item
    ? data.response.body.items.item
    : undefined;
};
