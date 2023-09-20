import React from 'react';
import { matchRoutes, RouteMatch, RouteObject, useRoutes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//layout
const LayoutPage = React.lazy(() => import('~/component/Layout/LayoutPage'));
const LoginView = React.lazy(() => import('~/component/Layout/LoginView'));
const RegisterView = React.lazy(() => import('~/component/Layout/RegisterView'));
const NotFound = React.lazy(() => import('~/component/Layout/NotFound'));

//system
const MenuListView = React.lazy(() => import('~/page/system/menu/MenuListView'));
const RoleListView = React.lazy(() => import('~/page/system/role/RoleListView'));
const UserListView = React.lazy(() => import('~/page/system/user/UserListView'));
const HouseListView = React.lazy(() => import('~/page/house/HouseListView'));

//home

const routeList = [
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                path: 'system',
                children: [
                    {
                        path: 'menu',
                        element: (
                            <PrivateRoute>
                                <MenuListView />
                            </PrivateRoute>
                        ),
                    },
                    // {
                    //     path: 'role',
                    //     element: (
                    //         // <PrivateRoute>
                    //             <RoleListView />
                    //         // </PrivateRoute>
                    //     ),
                    // },
                    {
                        path: 'user',
                        element: (
                            <PrivateRoute>
                                <UserListView />
                            </PrivateRoute>
                        ),
                    },
                ],
            },
            {
                path: 'home',
                children: [
                    {
                        path: 'house',
                        element: <HouseListView />,
                    },
                    // {
                    //     path: 'tuition-history',
                    //     element: <TuitionHistoryListView />,
                    // }
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/register',
        element: <RegisterView />,
    },
    {
        path: '/*',
        element: <NotFound />,
    },
] as RouteObject[];

export const AppRoute: React.FC = () => {
    if (process.env.NODE_ENV !== 'production') {
        const elements = useRoutes(routeList);
        return <>{elements}</>;
    }
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};

export const useMatchRoute = (pathName: string): RouteMatch<string>[] | null => {
    return matchRoutes(routeList, pathName);
};
