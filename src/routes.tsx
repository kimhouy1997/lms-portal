import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import CourseDetail from "./pages/public/CourseDetail";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import { ROUTES } from "./constant/routers";

const routes: RouteObject[] = [
    {
        path: ROUTES['home'],
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES['courses'],
                element: <Courses />,
            },
            {
                path: ROUTES['about'],
                element: <About />,
            },
            {
                path: `${ROUTES['courses']}/:id`,
                element: <CourseDetail />,
            },
            {
                path: ROUTES['login'],
                element: <Login />,
            },
            {
                path: ROUTES['register'],
                element: <Register />,
            },
        ],
    },
    {
        path: ROUTES['student']['index'],
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES['student']['dashboard'],
                element: <Courses />,
            },
            {
                path: ROUTES['student']['courses'],
                element: <About />,
            },
            {
                path: `${ROUTES['student']['courses']}/:id`,
                element: <CourseDetail />,
            },
            {
                path: ROUTES['student']['profile'],
                element: <Login />,
            },
            {
                path: ROUTES['student']['settings'],
                element: <Register />,
            },
        ],
    },
    {
        path: ROUTES['teacher']['index'],
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES['teacher']['dashboard'],
                element: <Courses />,
            },
            {
                path: ROUTES['teacher']['courses'],
                element: <About />,
            },
            {
                path: `${ROUTES['teacher']['courses']}/:id`,
                element: <CourseDetail />,
            },
            {
                path: ROUTES['teacher']['profile'],
                element: <Login />,
            },
            {
                path: ROUTES['teacher']['settings'],
                element: <Register />,
            },
        ],
    },
    {
        path: ROUTES['assistant']['index'],
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES['assistant']['dashboard'],
                element: <Courses />,
            },
            {
                path: ROUTES['assistant']['courses'],
                element: <About />,
            },
            {
                path: `${ROUTES['assistant']['courses']}/:id`,
                element: <CourseDetail />,
            },
            {
                path: ROUTES['assistant']['profile'],
                element: <Login />,
            },
            {
                path: ROUTES['assistant']['settings'],
                element: <Register />,
            },
        ],
    },
    {
        path: ROUTES['admin']['index'],
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES['admin']['dashboard'],
                element: <Courses />,
            },
            {
                path: ROUTES['admin']['courses'],
                element: <About />,
            },
            {
                path: `${ROUTES['admin']['courses']}/:id`,
                element: <CourseDetail />,
            },
            {
                path: ROUTES['admin']['profile'],
                element: <Login />,
            },
            {
                path: ROUTES['admin']['settings'],
                element: <Register />,
            },
        ],
    },  

];

export const router = createBrowserRouter(routes);