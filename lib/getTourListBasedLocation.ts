import { TourRootType } from "@/types/tourTypes";
import { getTourApiUrl } from "./getTourApiUrl";

/** 파라미터로 준 위치 주변의 관광지 정보를 구하는 함수입니다.
 *
 * @param lat 위도
 * @param lng 경도
 * @param r 반경
 * @param page 페이지 번호
 * @param rows 개수
 * @returns 주변 관광지 정보보
 */
export const getTourListBasedLocation = async (
  lat: number,
  lng: number,
  r: number = 1000,
  page: number = 1,
  rows: number = 10,
) => {
  const params = {
    numOfRows: rows,
    _type: "json",
    pageNo: page,
    MobileOS: "ETC",
    MobileApp: "AppTest",
    listYN: "Y",
    arrange: "A",
    mapX: lng,
    mapY: lat,
    radius: r,
    contentTypeId: 15,
  };
  const url = getTourApiUrl("locationBasedList1", params);
  const res = await fetch(url);
  const data: TourRootType = await res.json();
  return data.response.body.items.item;
};
