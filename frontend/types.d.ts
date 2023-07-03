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

// export interface Post {
//   id: string;
//   author: string;
//   message: string;
//   image: string | null;
// }
//
// export interface PostApi {
//   author: string;
//   message: string;
//   image: File | null;
// }
