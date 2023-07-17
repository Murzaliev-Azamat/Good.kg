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
  _id: string;
  title: string;
  categories: Types.ObjectId[];
  description: string | null;
  image: string | null;
  createdAt: Date;
  link: string | null;
}

export type CompanyWithoutId = Omit<Company, "_id">;

export interface Promotion {
  _id: string;
  title: string;
  company: Types.ObjectId;
  description: string;
  image: string | null;
  isAlways: boolean;
  createdAt: Date;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isBirthday: boolean;
  // isFresh: boolean;
  // rating: number;
  // userLikes: string[];
}

export type PromotionWithoutId = Omit<Promotion, "_id">;

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
}
