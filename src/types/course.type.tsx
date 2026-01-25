interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  price: string;
  rating: number;
  students: number;
  duration: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export type {
    CourseCardProps
}