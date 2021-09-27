import Login from "../pages/Login";
import Home from "../pages/Home";
import Exchange from "../pages/Exchange";
import NotFound from "../pages/NotFound";
import PublicLayout from "../layouts/PublicLayout";
import SystemLayout from "../layouts/SystemLayout";

const pages = [
    {
        exact: true,
        path: "/login",
        component: Login,
        layout: PublicLayout,
    },
    {
        exact: true,
        path: "/home",
        component: Home,
        layout: SystemLayout,
    },
    {
        exact: true,
        path: "/exchange",
        component: Exchange,
        layout: null,
    },
    {
        exact: false,
        path: "*",
        component: NotFound,
        layout: PublicLayout,
    },
];

export default pages;