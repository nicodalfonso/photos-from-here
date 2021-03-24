import React, { useState, useEffect, ReactElement } from "react";
import { fetchPhotos } from "../../utils";
import { Spinner } from "../spinner";

const positionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export const PhotoFrame = (): ReactElement => {
  const [photos, setPhotos] = useState<JSON[]>([]);

  useEffect((): void => {
    const requestGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(getPhotos, failure, positionOptions);
    };
    requestGeolocation();
  }, []);

  const getPhotos = async (pos: GeolocationPosition): Promise<void> => {
    const { coords }: { coords: GeolocationCoordinates } = pos;
    setPhotos(await fetchPhotos(coords));
  };

  const failure = (e: unknown) => {
    console.log(e);
  };

  return (
    <div className="flex justify-center items-center border-gray-500 border h-screen">
      <div className="ring-4 w-1/2 rounded-t-lg flex justify-center items-center h-3/5">
        <Spinner />
        <p className="text-lg text-black">{photos ? JSON.stringify(photos) : null}</p>
      </div>
    </div>
  );
};
