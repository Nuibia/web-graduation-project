//路由配置

import { lazy } from "react";
import PAGES from "./pages";

const routerConfig = [
    {
        path:PAGES.message,
        component:lazy(()=>import(/*webpackChunkName:"message"*/'../pages/message')),
    },
    {
        path:PAGES.bigScreen,
        component:lazy(()=>import(/*webpackChunkName:"big-screen"*/'../pages/big-screen')),
    },
    {
        path:PAGES.dataAnalysis,
        component:lazy(()=>import(/*webpackChunkName:"data-analysis"*/'../pages/data-analysis')),
    },
    {
        path:PAGES.login,
        component:lazy(()=>import(/*webpackChunkName:"login"*/'../pages/login')),
    },
    {
        path:PAGES.userInfo,
        component:lazy(()=>import(/*webpackChunkName:"userInfo"*/'../pages/userInfo')),
    },
];

export default routerConfig;
