import { PhotoData } from "../shared/types";

/** Returns fully-built Flickr API url with geolocation-specific request */
export const getApiUrl = (pos: GeolocationCoordinates): string => {
  /** Proxy server to handle Flicker not utilizing CORS */
  const CORS_ANYWHERE_PROXY: string = "https://shrouded-mountain-15003.herokuapp.com/";
  const FLIKR_API: string =
    "https://flickr.com/services/rest/?api_key=7771513eb517ec84aa1710b81f5fc710&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&perpage=5&lat=";

  return `${CORS_ANYWHERE_PROXY}${FLIKR_API}${pos.latitude}&lon=${pos.longitude}&accuracy=13`;
};

/** Return src url for individual Flickr image */
export const getImageUrls = (data: PhotoData[]): string[] => {
  return data.map((img) => `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`);
};
