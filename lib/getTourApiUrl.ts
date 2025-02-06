export const getTourApiUrl = (
  endPoint: string,
  requestParams?: { [key: string]: string | number },
) => {
  const params = new URLSearchParams({
    serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY as string,
    ...requestParams,
  });
  return `${process.env.NEXT_PUBLIC_TOUR_API_URL}/${endPoint}?${params.toString()}`;
};
