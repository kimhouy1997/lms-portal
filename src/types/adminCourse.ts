
export const CourseStatus = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
} as const;
export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

export const DifficultyLevel = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced'
} as const;
export type DifficultyLevel = typeof DifficultyLevel[keyof typeof DifficultyLevel];

export interface Technology {
    id: number;
    name: string;
    thumbnail?: string;
    description?: string;
}

export interface Chapter {
    id: number;
    title: string;
    description?: string;
    status: CourseStatus;
}

export interface Course {
    id: number;
    title: string;
    description?: string;
    slug: string;
    short_summary?: string;
    thumbnail?: string;
    price: number;
    is_free: boolean;
    level: DifficultyLevel;
    status: CourseStatus;
    technologies: Technology[];
    chapters: Chapter[];
    createdAt: string;
    updatedAt: string;
}
