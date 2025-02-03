export interface TourRootType {
  response: TourResponseType;
}

export interface TourResponseType {
  header: Header;
  body: Body;
}

export interface Header {
  resultCode: string;
  resultMsg: string;
}

export interface Body {
  items: TourItemsType;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface TourItemsType {
  item: TourItemType[] | "";
}

export interface TourItemType {
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
