import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
];

export const router = createBrowserRouter(routes);