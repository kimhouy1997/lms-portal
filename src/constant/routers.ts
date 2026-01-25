 const ROUTES = {
    home: '/',
    courses: 'courses',
    pricing: 'pricing',
    about: 'about',
    courseDetail: 'courses/:id',
    login: 'login',
    register: 'register',
    student:{
        index: 'student',
        dashboard: 'student/dashboard',
        courses: 'student/courses',
        courseDetail: 'student/courses/:id',
        profile: 'student/profile',
        settings: 'student/settings',
    },
    teacher:{
        index: 'teacher',
        dashboard: 'teacher/dashboard',
        courses: 'teacher/courses',
        courseDetail: 'teacher/courses/:id',
        profile: 'teacher/profile',
        settings: 'teacher/settings',
    },
    assistant:{
        index: 'assistant',
        dashboard: 'assistant/dashboard',
        courses: 'assistant/courses',
        courseDetail: 'assistant/courses/:id',
        profile: 'assistant/profile',
        settings: 'assistant/settings',
    },
    admin:{
        index: 'admin',
        dashboard: 'admin/dashboard',
        courses: 'admin/courses',
        courseDetail: 'admin/courses/:id',
        profile: 'admin/profile',
        settings: 'admin/settings',
    }
}

export {
    ROUTES
} 
