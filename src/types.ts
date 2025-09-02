interface Category {
  id: number;
  name: string;
  slug: string;
  children: {
    id: number;
    name: string;
    slug?: string;
    children: {
      id: number;
      name: string;
      slug?: string;
    }[];
  }[];
}
