export type Language = "en" | "es";

export interface ITechnologyCategory {
  _id: string;
  id?: string;
  order?: number;
  name: string;
  name_es: string;
  technologies: ITechnology[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITechnology {
  _id: string;
  id?: string;
  technologyCategory?: string;
  order: number;
  name: string;
  slug: string;
  imageColor?: string;
  imageColorFilepath?: string;
  imageLightBlue?: string;
  imageLightBlueFilepath?: string;
  imageWhite?: string;
  imageWhiteFilepath?: string;
  courses?: ICourse[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  _id: string;
  id?: string;
  name: string;
  description: string;
  platform: string;
  pricing: string;
  price: number;
  author: string;
  year: number;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  language: Language;
  technology: string;
  image: string;
  imageFilepath: string;
}

export interface ITechnologyCoursesCount {
  [courseId: string]: ICoursesCount;
}

export interface ICoursesCount {
  total: number;
  en: number;
  es: number;
}
