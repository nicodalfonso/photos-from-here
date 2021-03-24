import axios from "axios";
import { getApiUrl } from ".";
import { FlickrData } from "../shared/types";

export const fetchPhotos = async (pos: GeolocationCoordinates): Promise<FlickrData | undefined> => {
  try {
    const { data }: { data: FlickrData } = await axios.get<FlickrData>(getApiUrl(pos));
    return data;
  } catch (err) {
    console.error(err);
  }
};
