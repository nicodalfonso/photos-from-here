/** Data returned from Flickr's API for one photo */
export interface PhotoData {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: string;
  title: string;
  ispublic: string;
  isfriend: string;
  isfamily: string;
}

/** Aggregate data returned from Flicker's API, per call */
export interface FlickrData {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoData[];
  };
}
