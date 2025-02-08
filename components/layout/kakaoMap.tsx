/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getTourListBasedLocation } from "@/lib/getTourListBasedLocation";
import { KakaoMapAddressResponseType } from "@/types/kakaoMapTypes";
import { TourItemType } from "@/types/tourTypes";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import marker_red from "@/asset/mapPin_red.png";
import marker_blue from "@/asset/mapPin_blue.png";
import { StaticImageData } from "next/image";
import { useTourListStore } from "@/store/useTourListStore";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const tourList = useTourListStore((state) => state.tourList);
  const addTourList = useTourListStore((state) => state.addTourList);
  const changePosition = useTourListStore((state) => state.changePosition);
  const setCurrentAddress = useTourListStore(
    (state) => state.setCurrentAddress,
  );

  const mapDivRef = useRef(null);
  const defaultPosition = { lat: 37.578611, lng: 126.977222 };
  const mapRef = useRef<any>(null);
  const [isLoad, setIsLoad] = useState(false);

  // lat: 위도, lng: 경도
  // api에서 제공하는 변수 mapy: 위도, mapx: 경도
  const drawMarker = (
    lat: number,
    lng: number,
    imageData: StaticImageData,
    tour?: TourItemType,
  ) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      imageData.src,
      new window.kakao.maps.Size(imageData.width, imageData.height),
      {
        offset: new window.kakao.maps.Point(
          imageData.width / 2,
          imageData.height,
        ),
      },
    );
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      image: markerImage,
      clickable: true,
    });
    marker.setMap(mapRef.current);

    if (!tour) return;
    const content = `<div>${tour.title}</div>`;
    const infowindow = new window.kakao.maps.InfoWindow({
      position: new window.kakao.maps.LatLng(lat, lng),
      content: content,
      removable: true,
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(mapRef.current, marker);
    });
  };

  const moveMap = (lat: number, lng: number) => {
    const moveLocation = new window.kakao.maps.LatLng(lat, lng);
    mapRef.current?.panTo(moveLocation);
  };

  const getAddress = (
    lat: number,
    lng: number,
    callback: (obj: KakaoMapAddressResponseType[]) => void,
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, callback);
  };

  const setAddress = (obj: KakaoMapAddressResponseType[]) => {
    const data = obj;
    setCurrentAddress(data[0].address.address_name);
  };

  useEffect(() => {
    if (!isLoad) return;

    const fetch = async (lat: number, lng: number) => {
      changePosition(lat, lng);
      const currentState = useTourListStore.getState().tourParam;
      const data = await getTourListBasedLocation(currentState);
      if (data) {
        addTourList(data);
      }
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        moveMap(coords.latitude, coords.longitude);
        drawMarker(coords.latitude, coords.longitude, marker_blue);
        fetch(coords.latitude, coords.longitude);
      },
      (error) => {
        console.log(error);
        drawMarker(defaultPosition.lat, defaultPosition.lng, marker_blue);
        fetch(defaultPosition.lat, defaultPosition.lng);
        getAddress(defaultPosition.lat, defaultPosition.lng, setAddress);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad]);

  useEffect(() => {
    if (!Array.isArray(tourList)) return;
    tourList.map((tour: TourItemType) => {
      drawMarker(+tour.mapy, +tour.mapx, marker_red, tour);
    });
  }, [tourList]);

  return (
    <>
      <div ref={mapDivRef} className="h-full w-full"></div>
      <Script
        src={process.env.NEXT_PUBLIC_MAP_API_URL}
        onLoad={() => {
          window.kakao.maps.load(() => {
            mapRef.current = new window.kakao.maps.Map(mapDivRef.current, {
              center: new window.kakao.maps.LatLng(
                defaultPosition.lat,
                defaultPosition.lng,
              ),
              level: 5,
            });
          });
          setIsLoad(!isLoad);
        }}
      ></Script>
    </>
  );
}
