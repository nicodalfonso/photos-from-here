import React, { useState, useEffect, ReactElement } from "react";
import { fetchPhotos } from "../../utils";
import { Spinner } from "../spinner";
import { PhotoData } from "../../shared/types";

const positionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export const PhotoFrame = (): ReactElement => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  useEffect((): void => {
    const requestGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(getPhotos, locationFailure, positionOptions);
    };
    requestGeolocation();
  }, []);

  const getPhotos = async (pos: GeolocationPosition): Promise<void> => {
    const { coords }: { coords: GeolocationCoordinates } = pos;
    const data = await fetchPhotos(coords);
    if (data) {
      setPhotos(getImageUrls(data.photos.photo));
    }
    setLoading(false);
  };

  const locationFailure = (e: unknown) => {
    console.log(e);
  };

  const getImageUrls = (data: PhotoData[]): string[] => {
    return data.map((img) => `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`);
  };

  return (
    <div className="flex justify-center items-center border-gray-500 border h-screen">
      <div className="ring-4 w-1/2 rounded-t-lg flex justify-center items-center h-3/5">
        <p className="text-base text-black">
          {loading ? <Spinner /> : photos ? <img src={photos[photoIndex]} alt={photos[photoIndex]} /> : "An Error Has Occurred"}
        </p>
      </div>
    </div>
  );
};
