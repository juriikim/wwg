interface defaultRequestParamsType {
  [key: string]: string | number;
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
