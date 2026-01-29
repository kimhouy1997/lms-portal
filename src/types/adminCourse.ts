
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

export const ResourceType = {
    VIDEO: 'video',
    TEXT: 'text',
    PDF: 'pdf',
    QUIZ: 'quiz',
    ASSIGNMENT: 'assignment'
} as const;
export type ResourceType = typeof ResourceType[keyof typeof ResourceType];

export interface Technology {
    id: number;
    name: string;
    thumbnail?: string;
    description?: string;
}

export interface Resource {
    id: number;
    title: string;
    type: ResourceType;
    url?: string;
    path?: string;
    storage_provider?: string;
    description?: string;
}

export interface Assignment {
    id: number;
    title: string;
    description: string;
    total_points: number;
    passing_score: number;
    type: 'quiz' | 'task' | 'project';
}

export interface Lesson {
    id: number;
    title: string;
    description?: string;
    video_url?: string;
    duration?: string;
    is_preview: boolean;
    status: CourseStatus;
    resources?: Resource[];
}

export interface Chapter {
    id: number;
    title: string;
    description?: string;
    status: CourseStatus;
    lessons: Lesson[];
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
    assignments?: Assignment[];
    createdAt: string;
    updatedAt: string;
}
