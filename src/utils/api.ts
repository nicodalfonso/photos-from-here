import axios from "axios";
import { getApiUrl } from ".";

export const fetchPhotos = async (pos: GeolocationCoordinates): Promise<JSON[]> => {
  const { data }: { data: JSON[] } = await axios.get(getApiUrl(pos));
  return data;
};
