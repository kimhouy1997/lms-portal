import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "@components/layout/MainLayout";

import Home from "@pages/public/Home";
import About from "@pages/public/About";
import Courses from "@pages/public/Courses";
import CourseDetail from "@pages/public/CourseDetail";
import Login from "@pages/public/Login";
import Register from "@pages/public/Register";
import { ForgotPassword } from "@pages/public/ForgotPassword";

import { AuthGuard } from "./utils/auth/AuthGuard";
import { RoleGuard } from "./utils/auth/RoleGuard";
import { Forbidden, NotFound } from "@pages/errors";
import ConfirmRegister from "@pages/public/ConfirmRegister";
import { ROUTES } from "./constant/routers";
import Institute from "./pages/admin/Institute";
import { StudentLayout, TeacherLayout, AdminLayout } from "@components/layout/RoleLayouts";

import StudentSetting from "@pages/student/Setting";
import TeacherSetting from "@pages/teacher/Setting";
import AdminSetting from "@pages/admin/Setting";

const routes: RouteObject[] = [

  // ===== PUBLIC AUTH =====
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: ROUTES.forgotPassword,
    element: <ForgotPassword />,
  },

  // ===== PUBLIC =====
  {
    path: ROUTES.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.courses, element: <Courses /> },
      { path: `${ROUTES.courses}/:id`, element: <CourseDetail /> },
      { path: ROUTES.about, element: <About /> },
      { path: `${ROUTES.confirmRegister}/:uid/:token`, element: <ConfirmRegister /> }
    ],
  },

  // ===== STUDENT =====
  {
    path: ROUTES.student.index,
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard allowedRoles={["student"]} />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              { index: true, element: <Home /> },
              { path: ROUTES.student.dashboard, element: <Courses /> },
              { path: ROUTES.student.courses, element: <Courses /> },
              { path: `${ROUTES.student.courses}/:id`, element: <CourseDetail /> },
              { path: ROUTES.student.profile, element: <StudentSetting /> },
              { path: ROUTES.student.settings, element: <StudentSetting /> },
            ],
          },
        ],
      },
    ],



  },

  // ===== TEACHER =====
  {
    path: ROUTES.teacher.index,
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard allowedRoles={['teacher']} />,
        children: [
          {
            element: <TeacherLayout />,
            children: [
              { index: true, element: <Home /> },
              { path: ROUTES.teacher.dashboard, element: <Courses /> },
              { path: ROUTES.teacher.courses, element: <Courses /> },
              { path: `${ROUTES.teacher.courses}/:id`, element: <CourseDetail /> },
              { path: ROUTES.teacher.profile, element: <TeacherSetting /> },
              { path: ROUTES.teacher.settings, element: <TeacherSetting /> },
            ],
          },
        ],
      },
    ],

  },

  // ===== ADMIN =====
  {
    path: ROUTES.admin.index,
    element: <AuthGuard />,
    children: [
      {
        element: <RoleGuard allowedRoles={['admin']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <Home /> },
              { path: ROUTES.admin.dashboard, element: <Courses /> },
              { path: ROUTES.admin.courses, element: <Courses /> },
              { path: `${ROUTES.admin.courses}/:id`, element: <CourseDetail /> },
              { path: ROUTES.admin.institutes, element: <Institute /> },
              { path: ROUTES.admin.profile, element: <AdminSetting /> },
              { path: ROUTES.admin.settings, element: <AdminSetting /> },
            ],
          },
        ],
      },
    ],
  },
  // ===== ERRORS =====
  { path: "/403", element: <Forbidden /> },
  { path: "*", element: <NotFound /> },
];

export const router = createBrowserRouter(routes);
