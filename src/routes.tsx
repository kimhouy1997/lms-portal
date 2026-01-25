import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import CourseDetail from "./pages/public/CourseDetail";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import { ROUTES } from "./constant/routers";
import { AuthGuard } from "./utils/auth/AuthGuard";
import { RoleGuard } from "./utils/auth/RoleGuard";

const routes: RouteObject[] = [
  // ===== PUBLIC =====
  {
    path: ROUTES.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.courses, element: <Courses /> },
      { path: `${ROUTES.courses}/:id`, element: <CourseDetail /> },
      { path: ROUTES.about, element: <About /> },
      { path: ROUTES.login, element: <Login /> },
      { path: ROUTES.register, element: <Register /> },
    ],
  },

  // ===== STUDENT =====
  {
    path: ROUTES.student.index,
    element: <AuthGuard/>,
    children: [
    {
      element: <RoleGuard allowedRoles={["student"]} />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <Home /> },
          { path: ROUTES.student.dashboard, element: <Courses /> },
          { path: ROUTES.student.courses, element: <Courses /> },
          { path: `${ROUTES.student.courses}/:id`, element: <CourseDetail /> },
          { path: ROUTES.student.profile, element: <Login /> },
          { path: ROUTES.student.settings, element: <Register /> },
          ],
        },
      ],
    },
  ],
    
      
    
  },

  // ===== TEACHER =====
  {
    path: ROUTES.teacher.index,
    element: <AuthGuard/>,
    children: [
    {
      element: <RoleGuard allowedRoles={['teacher']} />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <Home /> },
          { path: ROUTES.teacher.dashboard, element: <Courses /> },
          { path: ROUTES.teacher.courses, element: <Courses /> },
          { path: `${ROUTES.teacher.courses}/:id`, element: <CourseDetail /> },
          { path: ROUTES.teacher.profile, element: <Login /> },
          { path: ROUTES.teacher.settings, element: <Register /> },
          ],
        },
      ],
    },
  ],
  
  },

  // ===== ADMIN =====
  {
    path: ROUTES.admin.index,
    element: <AuthGuard/>,
    children: [
      {
        element: <RoleGuard allowedRoles={['admin']} />,
        children: [
          { element: <MainLayout />,
          children: [
          { index: true, element: <Home /> },
          { path: ROUTES.admin.dashboard, element: <Courses /> },
          { path: ROUTES.admin.courses, element: <Courses /> },
          { path: `${ROUTES.admin.courses}/:id`, element: <CourseDetail /> },
          { path: ROUTES.admin.profile, element: <Login /> },
          { path: ROUTES.admin.settings, element: <Register /> },
          ],
        },
      ],
        },
  ],
},
];

export const router = createBrowserRouter(routes);
