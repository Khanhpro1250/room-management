import { faArrowRotateBack, faSave } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { AppContainer } from '~/component/Layout/AppContainer';
import CustomerForm, { CustomerFormRef } from './components/CustomerForm';
import { useRef, useState } from 'react';
import { useMergeState } from '~/hook/useMergeState';
import { Customer } from '~/types/shared/Customer';
import { requestApi } from '~/lib/axios';


interface State {
    loading: boolean;
    fetchHouse: boolean;
    initData: {
        customer: Customer;
        services: any[];
    };
}

const CustomerPage: React.FC = () => {
    const params = new URL(window.location.href).searchParams;
    const pushDomain = useNavigate();
    const location = useLocation();
    const roomId = params.get('roomId');
    const currTab = 'customer'
    const { tab = currTab } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [currentTab, setCurrentTab] = useState(tab);
    const [state, setState] = useMergeState<State>({
        loading: true,
        fetchHouse: false,
        initData: {
            customer: {} as Customer,
            services: [],
        },
    });
    const customerFormRef = useRef<CustomerFormRef>(null);

    const fetchData = async () => {
        // setState({
        //     loading: true,
        // });
        // const res = await requestApi('get', HOUSE_INDEX_API);
        // if (res.data?.success) {
        //     setState({
        //         loading: false,
        //         house: res.data?.result.items,
        //     });
        // }
    };

    return (
        <AppContainer className="body-page h-full overflow-auto">
            <Tabs
                type="card"
                onChange={key => {
                    pushDomain({ search: qs.stringify({ roomId: roomId, tab: key }) });
                    setCurrentTab(key);
                }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
                tabBarExtraContent={{
                    right: (
                        <div className="flex-1 flex items-center justify-end mb-2">
                            <ButtonBase
                                title="Trở về"
                                size="md"
                                startIcon={faArrowRotateBack}
                                variant="danger"
                            // onClick={props.onClose}
                            />
                            <ButtonBase
                                title="Lưu"
                                size="md"
                                startIcon={faSave}
                                onClick={()=> customerFormRef.current?.onSave()}
                            />
                        </div>
                    ),
                }}
            >
                <TabPane tab="Thông tin khách thuê" key="customer">
                    <CustomerForm
                        ref={customerFormRef}
                        parentId={roomId}
                    />
                </TabPane>
                <TabPane tab="Dịch vụ" key="service">
                    <>123123</>
                </TabPane>
                <TabPane tab="Thành viên" key="member">
                    <>123123</>
                </TabPane>
                <TabPane tab="Hợp đồng" key="contract">
                    <>123123</>
                </TabPane>
            </Tabs>
        </AppContainer>
    );
};
export default CustomerPage;
