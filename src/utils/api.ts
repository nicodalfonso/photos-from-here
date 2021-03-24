import axios from "axios";
import { getApiUrl } from ".";
import { Coordinates } from "../shared";

export const fetchPhotos = async (pos: Coordinates): Promise<JSON[]> => {
  const { data }: { data: JSON[] } = await axios.get(getApiUrl(pos));
  return data;
};
