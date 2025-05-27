import { createBrowserRouter } from "react-router";
import App from "../App";
import home from "../pages/home";
import register from "../pages/register";
import login from "../pages/login";
import profile from "../pages/profile";

export const route = createBrowserRouter([
    {
        path: "/",
        Component : home
    },
    {
        path: "/register",
        Component : register
    },
    {
        path:"/login",
        Component: login
    },
    {
        path:"/profile/:id",
        Component: profile
    }
]);