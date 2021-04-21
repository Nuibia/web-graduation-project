//路由配置

import { lazy } from "react";
import PAGES from "./pages";

const routerConfig = [
    {
        path:PAGES.message,
        component:lazy(()=>import(/*webpackChunkName:"message"*/'../pages/message')),
    },
    {
        path:PAGES.messageshow,
        component:lazy(()=>import(/*webpackChunkName:"messageshow"*/'../pages/messageshow')),
    },
    {
        path:PAGES.messageadd,
        component:lazy(()=>import(/*webpackChunkName:"messageadd"*/'../pages/messageadd')),
    },
    {
        path:PAGES.messageedit,
        component:lazy(()=>import(/*webpackChunkName:"messageedit"*/'../pages/messageedit')),
    },
    {
        path:PAGES.messagedetail,
        component:lazy(()=>import(/*webpackChunkName:"messagmessagedetaileadd"*/'../pages/messagedetail')),
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
