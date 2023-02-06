import Auth from "@/pages/Auth";
import Home from "@/pages/Home";

const routes = [
    {
        name: 'Auth',
        path: '/',
        component: Auth
    },
    {
        name: 'Home',
        path: '/home',
        component: Home
    },
];

export default routes;
