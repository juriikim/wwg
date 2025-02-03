"use client";
import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export default function KakaoMap() {
  const mapRef = useRef(null);
  return (
    <>
      <div ref={mapRef} className="h-full w-full"></div>
      <Script
        src={process.env.NEXT_PUBLIC_MAP_URL}
        onLoad={() => {
          window.kakao.maps.load(() => {
            new window.kakao.maps.Map(mapRef.current, {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            });
          });
        }}
      ></Script>
    </>
  );
}
