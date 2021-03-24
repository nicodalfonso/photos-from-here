export const getApiUrl = (pos: GeolocationCoordinates): string => {
  const CORS_ANYWHERE_PROXY: string = "https://shrouded-mountain-15003.herokuapp.com/";
  const FLIKR_API: string =
    "https://flickr.com/services/rest/?api_key=7771513eb517ec84aa1710b81f5fc710&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&perpage=5&lat=";

  return `${CORS_ANYWHERE_PROXY}${FLIKR_API}${pos.latitude}&lon=${pos.longitude}&accuracy=13`;
};
