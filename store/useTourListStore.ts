import { TourApiRequsetParamType } from "@/types/apiRequestTypes";
import { TourItemType } from "@/types/tourTypes";
import { create } from "zustand";

interface TourListStore {
  currentAddress: string;
  tourList: TourItemType[];
  tourParam: TourApiRequsetParamType;
  setCurrentAddress: (address: string) => void;
  addTourList: (newTourList: TourItemType[]) => void;
  changePosition: (lat: number, lng: number) => void;
  addPage: () => void;
}

export const useTourListStore = create<TourListStore>((set) => ({
  currentAddress: "",
  tourList: [],
  tourParam: {
    lat: 0,
    lng: 0,
    r: 1000,
    page: 1,
    rows: 15,
  },
  setCurrentAddress: (address: string) =>
    set(() => ({ currentAddress: address })),
  addTourList: (newTourList: TourItemType[]) =>
    set((state) => ({ tourList: [...state.tourList, ...newTourList] })),
  changePosition: (lat: number, lng: number) =>
    set((state) => ({
      tourParam: {
        ...state.tourParam,
        lat: lat,
        lng: lng,
      },
    })),
  addPage: () =>
    set((state) => ({
      tourParam: {
        ...state.tourParam,
        page: state.tourParam.page + 1,
      },
    })),
}));
