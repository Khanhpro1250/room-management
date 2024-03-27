import {
    faAngleDown,
    faArrowRotateBack,
    faCircleInfo,
    faCirclePlus,
    faDownload,
    faPlus,
    faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu, Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import qs from 'qs';
import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { AppContainer } from '~/component/Layout/AppContainer';
import { useCustomerInfo } from '~/hook/useCustomerInfo';
import ServiceRoom, { ServiceRoomRef } from '~/page/customers/components/ServiceRoom';
import ContractForm, { ContractFormRef } from './components/ContractForm';
import CustomerForm, { CustomerFormRef } from './components/CustomerForm';
import MemberForm, { MemberFormRef } from './components/MemberForm';
import { BaseIcon } from '~/component/Icon/BaseIcon';

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

    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div>
                    <div
                        className={
                            'text-sm inline-flex items-center font-bold leading-sm ' +
                            'uppercase px-[8px] py-[5px] bg-[#73737320] text-[#737373] rounded-md mr-1'
                        }
                    >
                        <BaseIcon icon={icon()} />
                    </div>
                    <span className="font-semibold text-lg">{title()}</span>
                </div>
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
        );
    };

    const renderExtraContent = () => {
        switch (currentTab) {
            case 'member':
                return (
                    <ButtonBase
                        size={'sm'}
                        onClick={() => {
                            memberFormRef.current?.onAddRow();
                        }}
                        className={'btn-create'}
                        variant={'success'}
                        title={'Thêm thành viên'}
                        startIcon={faPlus}
                    />
                );
            case 'contract':
                const menu = (
                    <Menu>
                        <Menu.Item key="download" onClick={() => contractFormRef.current?.onExport?.()}>
                            <div className="flex items-center justify-start">
                                <FontAwesomeIcon icon={faDownload} />
                                <span className="ml-3">Tải hợp đồng </span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="saveAndDownload" onClick={() => contractFormRef.current?.onSaveAndExport?.()}>
                            <div className="flex items-center justify-start">
                                <FontAwesomeIcon icon={faDownload} />
                                <span className="ml-3">Lưu và tải hợp đồng</span>
                            </div>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <div className="flex-1 flex items-center justify-end">
                        <Dropdown overlay={menu}>
                            <ButtonBase title="Tải xuống" size="md" endIcon={faAngleDown} variant="primary" />
                        </Dropdown>
                    </div>
                );
            default:
                return <></>;
        }
    };

    return (
        <AppContainer
            title={renderTitle()}
            loading={isFetching}
            className="body-page h-full overflow-auto relative p-0"
        >
            <Tabs
                tabBarExtraContent={renderExtraContent()}
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
                        roomCode={data?.room?.roomCode}
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
