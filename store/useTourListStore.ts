import { TourItemType } from "@/types/tourTypes";
import { create } from "zustand";

interface TourListStore {
  tourList: TourItemType[];
  addTourList: (newTourList: TourItemType[]) => void;
}

export const useTourListStore = create<TourListStore>((set) => ({
  tourList: [],
  addTourList: (newTourList: TourItemType[]) =>
    set((state) => ({ tourList: [...state.tourList, ...newTourList] })),
}));
