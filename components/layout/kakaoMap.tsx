/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getTourListBasedLocation } from "@/lib/getTourListBasedLocation";
import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const mapDivRef = useRef(null);
  const defaultPosition = { x: 37.578611, y: 126.977222 };
  const mapRef = useRef<any>(null);
  const marker = useRef<any>(null);

  const drawMarker = (x: number, y: number) => {
    marker.current = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(x, y),
    });
    marker.current.setMap(mapRef.current);
  };

  const moveMap = (x: number, y: number) => {
    const moveLocation = new window.kakao.maps.LatLng(x, y);
    mapRef.current?.panTo(moveLocation);
  };

  useEffect(() => {
    const position = { x: 0, y: 0 };
    const fetch = async (x: number, y: number) => {
      await getTourListBasedLocation(x, y);
    };

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      position.x = coords.latitude;
      position.y = coords.longitude;
      moveMap(coords.latitude, coords.longitude);
      drawMarker(coords.latitude, coords.longitude);
      fetch(position.x, position.y);
    });
  }, []);

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
