import { faArrowRotateBack, faCircleInfo, faCirclePlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import qs from 'qs';
import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import Loading from '~/component/Elements/loading/Loading';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { AppContainer } from '~/component/Layout/AppContainer';
import { useCustomerInfo } from '~/hook/useCustomerInfo';
import ServiceRoom, { ServiceRoomRef } from '~/page/customers/components/ServiceRoom';
import ContractForm, { ContractFormRef } from './components/ContractForm';
import CustomerForm, { CustomerFormRef } from './components/CustomerForm';
import MemberForm, { MemberFormRef } from './components/MemberForm';

interface State {}

const CustomerPage: React.FC = () => {
    const params = new URL(window.location.href).searchParams;
    const overlayRef = useRef<OverlayRef>(null);
    const pushDomain = useNavigate();
    const location = useLocation();
    const roomId = params.get('roomId');
    const isDetail = params.get('isDetail') === 'true';
    const currTab = 'customer';
    const { tab = currTab } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [currentTab, setCurrentTab] = useState(tab);
    const customerFormRef = useRef<CustomerFormRef>(null);
    const serviceRoomRef = useRef<ServiceRoomRef>(null);
    const contractFormRef = useRef<ContractFormRef>(null);
    const memberFormRef = useRef<MemberFormRef>(null);

    const { data: response, isFetching, refetch } = useCustomerInfo(roomId);

    const data = useMemo(() => response?.data?.result, [response]);

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

    const onClickSave = () => {
        // if (customerFormRef.current?.isValid()) {
        if (currentTab === 'customer') {
            customerFormRef.current?.onSave();
        }
        if (currentTab === 'service') {
            serviceRoomRef.current?.onSave();
        }
        if (currentTab === 'contract') {
            contractFormRef.current?.onSave();
        }
        if (currentTab === 'member') {
            memberFormRef.current?.onSave();
        }
        // } {
        //     return NotifyUtil.warn(NotificationConstant.TITLE, 'Phải thêm thông tin khách thuê trước !');
        // }
    };
    return isFetching ? (
        <Loading />
    ) : (
        <AppContainer className="body-page h-full overflow-auto relative p-0">
            <div className="flex items-center sticky top-0 left-0 right-0 bg-white z-10">
                <FontAwesomeIcon size={'2x'} icon={icon()} className="mr-1.5" />
                <span className="font-bold text-2xl  text-gray-600">{title()}</span>
                <div className=" flex-1 flex items-center justify-end mb-2">
                    <ButtonBase
                        title="Trở về"
                        size="md"
                        startIcon={faArrowRotateBack}
                        variant="danger"
                        onClick={() => pushDomain('/room-manage')}
                    />
                    <ButtonBase title="Lưu" size="md" startIcon={faSave} onClick={onClickSave} />
                </div>
            </div>

            <Tabs
                className="mt-2"
                type="card"
                onChange={key => {
                    pushDomain({ search: qs.stringify({ roomId: roomId, tab: key, isDetail: isDetail }) });
                    setCurrentTab(key);
                }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
            >
                <TabPane tab={<div className="text-[16px]">Thông tin khách thuê</div>} key="customer">
                    <CustomerForm
                        ref={customerFormRef}
                        parentId={roomId}
                        initialValues={data?.customer}
                        readonly={isDetail}
                        onSubmitSuccessfully={refetch}
                        mask={() => overlayRef.current?.open()}
                        unMask={() => overlayRef.current?.close()}
                    />
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Dịch vụ</div>} key="service">
                    <ServiceRoom
                        ref={serviceRoomRef}
                        members={data?.members ?? []}
                        initialValues={data?.services}
                        listServices={data?.listServices}
                        customerId={data?.customer?.id}
                        readonly={isDetail}
                        mask={() => overlayRef.current?.open()}
                        unMask={() => overlayRef.current?.close()}
                    />
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Thành viên</div>} key="member">
                    <MemberForm
                        ref={memberFormRef}
                        services={data?.services ?? []}
                        initialValues={data?.members}
                        customerId={data?.customer?.id}
                        readonly={isDetail}
                        maxNumberOfPeople={data?.room?.maxNumberOfPeople}
                        mask={() => overlayRef.current?.open()}
                        unMask={() => overlayRef.current?.close()}
                    />
                </TabPane>
                <TabPane tab={<div className="text-[16px]">Hợp đồng</div>} key="contract">
                    <ContractForm
                        ref={contractFormRef}
                        roomId={roomId}
                        customer={data?.customer}
                        initialValues={data?.contract}
                        mask={() => overlayRef.current?.open()}
                        unMask={() => overlayRef.current?.close()}
                    />
                </TabPane>
            </Tabs>
            <Overlay ref={overlayRef} />
        </AppContainer>
    );
};
export default CustomerPage;
