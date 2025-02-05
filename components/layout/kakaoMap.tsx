/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getTourListBasedLocation } from "@/lib/getTourListBasedLocation";
import { KakaoMapAddressResponseType } from "@/types/kakaoMapTypes";
import { TourItemType } from "@/types/tourTypes";
import Script from "next/script";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  tourList: TourItemType[] | "";
  setTourList: Dispatch<SetStateAction<"" | TourItemType[]>>;
  setCurrentAddress: Dispatch<SetStateAction<string>>;
}

export default function KakaoMap({
  tourList,
  setTourList,
  setCurrentAddress,
}: KakaoMapProps) {
  const mapDivRef = useRef(null);
  const defaultPosition = { lat: 37.578611, lng: 126.977222 };
  const mapRef = useRef<any>(null);
  const [isLoad, setIsLoad] = useState(false);

  // lat: 위도, lng: 경도
  // api에서 제공하는 변수 mapy: 위도, mapx: 경도
  const drawMarker = (lat: number, lng: number) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
    });
    marker.setMap(mapRef.current);
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
    console.log(data);
    setCurrentAddress(data[0].address.address_name);
  };

  useEffect(() => {
    if (!isLoad) return;

    const position = { lat: 0, lng: 0 };
    const fetch = async (lat: number, lng: number) => {
      const data = await getTourListBasedLocation(lat, lng);
      console.log(data);
      setTourList(data);
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        position.lat = coords.latitude;
        position.lng = coords.longitude;
        moveMap(coords.latitude, coords.longitude);
        drawMarker(coords.latitude, coords.longitude);
        fetch(position.lat, position.lng);
      },
      (error) => {
        console.log(error);
        drawMarker(defaultPosition.lat, defaultPosition.lng);
        fetch(defaultPosition.lat, defaultPosition.lng);
        getAddress(defaultPosition.lat, defaultPosition.lng, setAddress);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoad]);

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
