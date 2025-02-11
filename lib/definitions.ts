export type TechnologyForm = {
  _id: string;
  technologyCategory: string;
  order: number;
  name: string;
  slug: string;
  imageWhite: string;
  imageLightBlue: string;
};

export type TechnologyCategoryForm = {
  _id: string;
  order: number;
  name: string;
  name_es: string;
};

export type CourseForm = {
  _id: string;
  technology: string;
  language: string;
  name: string;
  description: string;
  long_description: string;
  image: string;
  platform: string;
  author: string;
  pricing: string;
  price: number;
  year: number;
  link: string;
};
