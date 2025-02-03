/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getTourListBasedLocation } from "@/lib/getTourListBasedLocation";
import { TourItemType } from "@/types/tourTypes";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const mapDivRef = useRef(null);
  const defaultPosition = { x: 37.578611, y: 126.977222 };
  const mapRef = useRef<any>(null);
  const [tourList, setTourList] = useState<TourItemType[] | "">("");

  const drawMarker = (x: number, y: number) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(x, y),
    });
    marker.setMap(mapRef.current);
  };

  const moveMap = (x: number, y: number) => {
    const moveLocation = new window.kakao.maps.LatLng(x, y);
    mapRef.current?.panTo(moveLocation);
  };

  useEffect(() => {
    const position = { x: 0, y: 0 };
    const fetch = async (x: number, y: number) => {
      const data = await getTourListBasedLocation(x, y);
      console.log(data);
      setTourList(data);
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        position.x = coords.latitude;
        position.y = coords.longitude;
        moveMap(coords.latitude, coords.longitude);
        drawMarker(coords.latitude, coords.longitude);
        fetch(position.y, position.x);
      },
      (error) => {
        console.log(error);
        drawMarker(defaultPosition.x, defaultPosition.y);
        fetch(defaultPosition.y, defaultPosition.x);
      },
    );
  }, [defaultPosition.x, defaultPosition.y]);

  useEffect(() => {
    if (!Array.isArray(tourList)) return;
    tourList.map((tour: TourItemType) => {
      drawMarker(+tour.mapy, +tour.mapx);
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
                defaultPosition.x,
                defaultPosition.y,
              ),
              level: 3,
            });
          });
        }}
      ></Script>
    </>
  );
}
