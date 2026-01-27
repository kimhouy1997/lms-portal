 const ROUTES = {
    home: '/',
    courses: 'courses',
    pricing: 'pricing',
    about: 'about',
    courseDetail: 'courses/:id',
    login: 'login',
    register: 'register',
    forgotPassword: 'forgot-password',
    confirmRegister:'confirm-register', 
    student:{
        index: 'student',
        dashboard: 'dashboard',
        courses: 'courses',
        courseDetail: 'courses/:id',
        profile: 'profile',
        settings: 'settings',
    },
    teacher:{
        index: 'teacher',
        dashboard: 'dashboard',
        courses: 'courses',
        courseDetail: 'courses/:id',
        profile: 'profile',
        settings: 'settings',
    },
    assistant:{
        index: 'assistant',
        dashboard: 'dashboard',
        courses: 'courses',
        courseDetail: 'courses/:id',
        profile: 'profile',
        settings: 'settings',
    },
    admin:{
        index: '/admin',
        dashboard: 'dashboard',
        courses: 'courses',
        courseDetail: 'courses/:id',
        institutes: 'institutes',
        instituteCreate: 'institutes/create',
        instituteEdit: 'institutes/edit/:id',
        profile: 'profile',
        settings: 'settings',
    }
}

export {
    ROUTES
} 
