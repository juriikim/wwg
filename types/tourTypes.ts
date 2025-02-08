export interface TourResponseType {
  response: TourResponseContentType;
}

interface TourResponseContentType {
  header: TourResponseHeaderType;
  body: TourResponseBodyType;
}

interface TourResponseHeaderType {
  resultCode: string;
  resultMsg: string;
}

interface TourResponseBodyType {
  items: TourResponseItemsType;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

interface TourResponseItemsType {
  item: TourItemResponseType[] | "";
}

interface TourItemResponseType {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}

export interface TourItemType extends TourItemResponseType {
  length?: number | undefined;
}
