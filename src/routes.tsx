import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);