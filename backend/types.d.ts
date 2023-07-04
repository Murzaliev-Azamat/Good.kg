export interface Artist {
  id: string;
  name: string;
  image: string | null;
  info: string;
}

export type ArtistWithoutId = Omit<Artist, "id">;

export interface AlbumMutation {
  artist: string;
  name: string;
  image: string | null;
  year: number;
}

export interface TrackMutation {
  album: string;
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
}

export interface TrackHistoryMutation {
  user: ObjectId;
  track: string;
  datetime: Date;
}

export interface Category {
  id: string;
  title: string;
  parent: string | null;
}

export type CategoryWithoutId = Omit<Category, "id">;

export interface Company {
  id: string;
  title: string;
  categories: Types.ObjectId[];
  description: string | null;
  image: string | null;
  link: string | null;
}

export type CompanyWithoutId = Omit<Company, "id">;

export interface Promotion {
  id: string;
  title: string;
  company: Types.ObjectId;
  description: string;
  image: string | null;
  rating: number;
}

export type PromotionWithoutId = Omit<Promotion, "id">;

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
}
