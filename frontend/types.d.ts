export interface Promotion {
  id: number;
  title: string;
  description: string;
  company: {
    id: number;
    title: string;
    image: string;
    categories: [{ id: number }];
    imagePath: string;
  };
  rating: number;
}

export interface Company {
  id: number;
  title: string;
  description: string | null;
  image: string;
  categories: [{ id: number }];
  rating: number;
  updatedAt: string;
  link: string;
  imagePath: string;
}

export interface FilterByCategory {
  category: string;
}

export interface Search {
  search: string;
}

export interface Category {
  id: number;
  title: string;
  position: null;
  parent: {
    id: number;
    title: string;
    position: null;
    parent: null;
  };
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  image: File | null;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  image?: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
