import React from 'react';
import { matchRoutes, RouteMatch, RouteObject, useRoutes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import WaterServiceListView from '~/page/electric-service/WaterServiceListView';

//layout
const LayoutPage = React.lazy(() => import('~/component/Layout/LayoutPage'));
const LoginView = React.lazy(() => import('~/component/Layout/LoginView'));
const RegisterView = React.lazy(() => import('~/component/Layout/RegisterView'));
const ForgotPassword = React.lazy(() => import('~/component/Layout/ForgotPassword'));
const NotFound = React.lazy(() => import('~/component/Layout/NotFound'));

//system
const MenuListView = React.lazy(() => import('~/page/system/menu/MenuListView'));
const RoleListView = React.lazy(() => import('~/page/system/role/RoleListView'));
const UserListView = React.lazy(() => import('~/page/system/user/UserListView'));
const HouseListView = React.lazy(() => import('~/page/house/HouseListView'));
const RoomPage = React.lazy(() => import('~/page/room/RoomPage'));
const CustomerPage = React.lazy(() => import('~/page/customers/CustomerPage'));
const ServicesListView = React.lazy(() => import('~/page/services/ServicesListView'));
const ElectricServiceListView = React.lazy(() => import('~/page/electric-service/ElectricServiceListView'));

//home

const routeList = [
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                path: '/',
                element: <RoomPage />,
            },
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
                    {
                        path: 'role',
                        element: (
                            <PrivateRoute>
                                <RoleListView />
                            </PrivateRoute>
                        ),
                    },
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
                path: 'room-manage',
                element: <RoomPage />,
            },
            {
                path: 'customer',
                element: <CustomerPage />,
            },
            {
                path: 'service',
                element: <ServicesListView />,
            },
            {
                path: 'number-electric',
                element: <ElectricServiceListView />,
            },
            {
                path: 'number-water',
                element: <WaterServiceListView />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
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
