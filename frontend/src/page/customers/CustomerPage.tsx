import { faArrowRotateBack, faCircleInfo, faCirclePlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import qs from 'qs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { AppContainer } from '~/component/Layout/AppContainer';
import { useMergeState } from '~/hook/useMergeState';
import { requestApi } from '~/lib/axios';
import { Customer } from '~/types/shared/Customer';
import { DATA_WITH_ROOM_API } from '../room/api/room.api';
import { CustomerFormRef } from './components/CustomerForm';
import Loading from '~/component/Elements/loading/Loading';
import { Service } from '~/types/shared/Service';
const CustomerForm = React.lazy(() => import('~/page/customers/components/CustomerForm'));
const ServiceRoom = React.lazy(() => import('~/page/customers/components/ServiceRoom'));

interface State {
    loading: boolean;
    initData: {
        customer: Customer;
        services: Service[];
    };
}

const CustomerPage: React.FC = () => {
    const params = new URL(window.location.href).searchParams;
    const pushDomain = useNavigate();
    const location = useLocation();
    const roomId = params.get('roomId');
    const currTab = 'customer';
    const { tab = currTab } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [currentTab, setCurrentTab] = useState(tab);
    const [state, setState] = useMergeState<State>({
        loading: true,
        initData: {
            customer: {} as Customer,
            services: [],
        },
    });
    const customerFormRef = useRef<CustomerFormRef>(null);

    const title = () => {
        switch (currentTab) {
            case 'customer':
                return 'Thông tin khách thuê';
            case 'service':
                return 'Dịch vụ';
            case 'member':
                return 'Thành viên';
            case 'contract':
                return 'Hợp đồng';
            default:
                return '';
        }
    };
    const icon = () => {
        switch (currentTab) {
            case 'customer':
                return faCircleInfo;
            case 'service':
                return faCirclePlus;
            case 'member':
                return faCircleInfo;
            case 'contract':
                return faCirclePlus;
            default:
                return faCircleInfo;
        }
    };

    const fetchData = async () => {
        setState({
            loading: true,
        });
        const res = await requestApi('get', DATA_WITH_ROOM_API, { roomId });
        if (res.data?.success) {
            const data = res.data?.result;
            setState({
                loading: false,
                initData: {
                    customer: data?.customer,
                    services: data?.services,
                },
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return state.loading ? (
        <Loading />
    ) : (
        <AppContainer className="body-page h-full overflow-auto relative p-0">
            <div className="flex items-center sticky top-0 left-0 right-0 bg-white z-10">
                <FontAwesomeIcon size={'2x'} icon={icon()} className="mr-1.5" />
                <span className="font-bold text-2xl  text-gray-600">{title()}</span>
                <div className=" flex-1 flex items-center justify-end mb-2">
                    <ButtonBase
                        title="Trở về"
                        size="lg"
                        startIcon={faArrowRotateBack}
                        variant="danger"
                        // onClick={props.onClose}
                    />
                    <ButtonBase
                        title="Lưu"
                        size="lg"
                        startIcon={faSave}
                        onClick={() => customerFormRef.current?.onSave()}
                    />
                </div>
            </div>

            <Tabs
                className="mt-2"
                type="card"
                onChange={key => {
                    pushDomain({ search: qs.stringify({ roomId: roomId, tab: key }) });
                    setCurrentTab(key);
                }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
            >
                <TabPane tab={<div className="text-[16px]">Thông tin khách thuê</div>} key="customer">
                    <CustomerForm ref={customerFormRef} parentId={roomId} initialValues={state.initData.customer} />
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Dịch vụ</div>} key="service">
                    <ServiceRoom initialValues={state.initData.services}/>
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Thành viên</div>} key="member">
                    <>123123</>
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Hợp đồng</div>} key="contract">
                    <>123123</>
                </TabPane>
            </Tabs>
        </AppContainer>
    );
};
export default CustomerPage;
