interface defaultRequestParamsType {
  [key: string]: string | number;
}

/* 현재 지역 기준 관광지 목록 API 요청 타입*/
export interface TourApiRequsetParamType {
  lat: number;
  lng: number;
  r: number;
  page: number;
  rows: number;
}

export interface TourRequestType extends defaultRequestParamsType {
  numOfRows: number;
  _type: string;
  pageNo: number;
  MobileOS: string;
  MobileApp: string;
  listYN: string;
  arrange: string;
  mapX: number;
  mapY: number;
  radius: number;
  contentTypeId: number;
}
