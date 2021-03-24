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
  const [orientation, setOrientation] = useState<string>("");

  useEffect((): void => {
    const requestGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(getPhotos, locationFailure, positionOptions);
    };
    requestGeolocation();
  }, []);

  useEffect(() => {
    setOrientation(getOrientation(photos[photoIndex]));
  }, [photos, photoIndex]);

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

  const getOrientation = (src: string): string => {
    const img = new Image();
    img.src = src;
    if (img.naturalWidth > img.naturalHeight) {
      return "w-full";
    } else {
      return "h-full";
    }
  };

  const getPreviousPhoto = (): void => {
    photoIndex > 0 ? setPhotoIndex(photoIndex - 1) : setPhotoIndex(photos.length - 1);
  };

  const getNextPhoto = (): void => {
    photoIndex < photos.length - 1 ? setPhotoIndex(photoIndex + 1) : setPhotoIndex(0);
  };

  return (
    <div className="flex justify-center items-center border-gray-500 border h-screen">
      <div className="bg-gray-700 h-2/5 w-32 rounded-l-lg flex items-center justify-center cursor-pointer" onClick={getPreviousPhoto}>
        <svg
          className="fill-current text-blue-200 h-24 w-24 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={getPreviousPhoto}
        >
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm8-10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zM7.46 9.3L11 5.75l1.41 1.41L9.6 10l2.82 2.83L11 14.24 6.76 10l.7-.7z" />
        </svg>
      </div>
      <div className="ring-4 w-1/2 rounded-t-lg flex justify-center items-center h-3/5 bg-gray-800 p-14">
        {loading ? (
          <Spinner />
        ) : photos ? (
          <img className={`select-none ${orientation}`} src={photos[photoIndex]} alt={photos[photoIndex]} />
        ) : (
          <p className="text-base text-black">"An Error Has Occurred"</p>
        )}
      </div>
      <div className="bg-gray-700 h-2/5 w-32 rounded-r-lg flex items-center justify-center cursor-pointer" onClick={getNextPhoto}>
        <svg
          className="fill-current text-blue-200 h-24 w-24 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={getNextPhoto}
        >
          <path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z" />
        </svg>
      </div>
    </div>
  );
};
