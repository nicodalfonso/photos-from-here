import React, { useState, useEffect, ReactElement } from "react";
import { fetchPhotos, getImageUrls } from "../../utils";
import { Spinner } from "../spinner";

/** UI Component for displaying and navigating photos returned from Flickr's API
 *
 * Includes loading Spinner, error handling, and keyboard-focusable navigation elements.
 */
export const PhotoFrame = (): ReactElement => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  useEffect((): void => {
    /** Requests permission to use geolocation information */
    const requestGeolocation = (): void => {
      navigator.geolocation.getCurrentPosition(getPhotos, locationFailure, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    };
    requestGeolocation();
  }, []);

  /** Fetch and store photos taken near user's geolocation
   *
   * Success callback for requestGeolocation()
   */
  const getPhotos = async (pos: GeolocationPosition): Promise<void> => {
    const { coords }: { coords: GeolocationCoordinates } = pos;
    const data = await fetchPhotos(coords);
    if (data) {
      setPhotos(getImageUrls(data.photos.photo));
    }
    setLoading(false);
  };

  /** Set error message
   *
   * Failure callback for requestGeolocation()
   */
  const locationFailure = (e: unknown) => {
    setError("We were unable to find your location.");
  };

  /** Load previous photo */
  const getPreviousPhoto = (e: React.MouseEvent | React.KeyboardEvent): void => {
    if (e.type === "keyup") {
      if ((e as React.KeyboardEvent).key !== "Enter" && (e as React.KeyboardEvent).key !== " ") {
        return;
      }
    }
    photoIndex > 0 ? setPhotoIndex(photoIndex - 1) : setPhotoIndex(photos.length - 1);
  };

  /** Load next photo */
  const getNextPhoto = (e: React.MouseEvent | React.KeyboardEvent): void => {
    if (e.type === "keyup") {
      if ((e as React.KeyboardEvent).key !== "Enter" && (e as React.KeyboardEvent).key !== " ") {
        return;
      }
    }
    photoIndex < photos.length - 1 ? setPhotoIndex(photoIndex + 1) : setPhotoIndex(0);
  };

  return (
    // background
    <div className="flex justify-center items-center border-gray-500 border h-screen bg-indigo-100">
      {/* left navigation pane / chevron */}
      <div className="bg-gray-700 h-2/5 w-32 rounded-l-lg flex items-center justify-center cursor-pointer" onClick={getPreviousPhoto}>
        <svg
          className="fill-current text-blue-200 h-24 w-24 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={getPreviousPhoto}
          tabIndex={0}
          onKeyUp={(e: React.KeyboardEvent<SVGSVGElement>): void => getPreviousPhoto(e)}
        >
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm8-10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zM7.46 9.3L11 5.75l1.41 1.41L9.6 10l2.82 2.83L11 14.24 6.76 10l.7-.7z" />
        </svg>
      </div>

      {/* Spinner, current photo, or error message */}
      <div className="ring-4 w-1/2 rounded-t-lg flex justify-center items-center h-3/5 bg-gray-800 p-14 shadow-inner z-10">
        {error ? (
          <p className="text-base text-indigo-100 text-center">{error}</p>
        ) : loading ? (
          <Spinner />
        ) : photos ? (
          <img className={`select-none shadow-2xl`} src={photos[photoIndex]} alt={photos[photoIndex]} />
        ) : null}
      </div>

      {/* right navigation pane / chevron */}
      <div className="bg-gray-700 h-2/5 w-32 rounded-r-lg flex items-center justify-center cursor-pointer" onClick={getNextPhoto}>
        <svg
          className="fill-current text-blue-200 h-24 w-24 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={getNextPhoto}
          tabIndex={0}
          onKeyUp={(e: React.KeyboardEvent<SVGSVGElement>): void => getNextPhoto(e)}
        >
          <path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z" />
        </svg>
      </div>
    </div>
  );
};
