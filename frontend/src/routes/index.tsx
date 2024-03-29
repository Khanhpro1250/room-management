import React from 'react';
import { matchRoutes, RouteMatch, RouteObject, useRoutes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
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
const RoomPage = React.lazy(() => import('~/page/room/RoomPage'));
const CustomerPage = React.lazy(() => import('~/page/customers/CustomerPage'));
const ServicesListView = React.lazy(() => import('~/page/services/ServicesListView'));
const ElectricServiceListView = React.lazy(() => import('~/page/electric-service/ElectricServiceListView'));
const WaterServiceListView = React.lazy(() => import('~/page/electric-service/WaterServiceListView'));
const IncurredCostListView = React.lazy(() => import('~/page/electric-service/IncurredCostListView'));
const CustomerListView = React.lazy(() => import('~/page/customers/CustomerListView'));
const CalculateChargeListView = React.lazy(() => import('~/page/CalculateCharge/CalculateChargeListView'));
const ReportDashboard = React.lazy(() => import('~/page/dashboard/ReportDashboard'));
const DepositListView = React.lazy(() => import('~/page/deposits/DepositListView'));
const ProfileSetting = React.lazy(() => import('~/page/settings/ProfileSetting'));

//home

const routeList = [
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                path: '/',
                element: <ReportDashboard />,
            },
            {
                path: '/dashboard',
                element: <ReportDashboard />,
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
                path: 'customer-list',
                element: <CustomerListView />,
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
            {
                path: 'incurred-cost',
                element: <IncurredCostListView />,
            },
            {
                path: 'calculate-charge',
                element: <CalculateChargeListView />,
            },
            {
                path: 'deposit',
                element: <DepositListView />,
            },
            {
                path: 'profile',
                element: <ProfileSetting />,
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
