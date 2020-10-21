const dynamicRoutes = [{
        path: '/',
        component: Home,
        children: []
    },
    {
        path: '*',
        component: () => import( /*webpackChunkName:'page404' */ '../pages/Page404')
    }
]