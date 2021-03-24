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

export interface FlickrData {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoData[];
  };
}

export interface Orientation {
  width: string | number;
  height: string | number;
}
