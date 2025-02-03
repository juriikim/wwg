"use client";
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

  const moveMap = (x: number, y: number) => {
    const moveLocation = new window.kakao.maps.LatLng(x, y);
    mapRef.current?.panTo(moveLocation);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      moveMap(coords.latitude, coords.longitude);
    });
  }, []);

  return (
    <>
      <div ref={mapDivRef} className="h-full w-full"></div>
      <Script
        src={process.env.NEXT_PUBLIC_MAP_URL}
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
