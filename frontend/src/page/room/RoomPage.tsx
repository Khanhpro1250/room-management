import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    faBed,
    faBolt,
    faEdit,
    faHouse,
    faList,
    faSearch,
    faTrash,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Input, Select, Tabs } from 'antd';
import _, { debounce } from 'lodash';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import Loading from '~/component/Elements/loading/Loading';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import NotificationConstant from '~/configs/contants';
import { useMergeState } from '~/hook/useMergeState';
import { requestApi } from '~/lib/axios';
import { RoomListViewRef } from '~/page/room/component/RoomListView';
import { House } from '~/types/shared';
import NotifyUtil from '~/util/NotifyUtil';
import { HOUSE_DELETE_API, HOUSE_INDEX_API } from '../house/api/house.api';
import HomeForm from '../house/components/HomeForm';
import emptyData from '~/assets/layout/emptydata.png';
import { BaseIcon } from '~/component/Icon/BaseIcon';

const RoomListView = React.lazy(() => import('~/page/room/component/RoomListView'));

interface State {
    loading: boolean;
    fetchHouse: boolean;
    house: House[];
}
const RoomPage: React.FC = () => {
    const location = useLocation();
    const pushDomain = useNavigate();
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const roomListViewRef = useRef<RoomListViewRef>(null);
    const [state, setState] = useMergeState<State>({
        loading: true,
        fetchHouse: false,
        house: [],
    });

    const currTab = _.first(state.house)?.id;

    const { tab = currTab } = qs.parse(location.search, { ignoreQueryPrefix: true });

    const [currentTab, setCurrentTab] = useState(tab);

    useEffect(() => {
        if (tab) {
            setCurrentTab(tab);
        }
    }, [tab]);

    const onCreate = () => {
        modalRef.current?.onOpen(
            <HomeForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    setState({ fetchHouse: !state.fetchHouse });
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Tạo mới nhà',
            '50%',
        );
    };

    const updateHouse = async () => {
        modalRef.current?.onOpen(
            <HomeForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    setState({ fetchHouse: !state.fetchHouse });
                }}
                onClose={modalRef.current?.onClose}
                initialValues={state.house.find(item => item.id === currentTab)}
            />,
            'Cập nhật nhà',
            '50%',
            icon(faEdit),
        );
    };

    const fetchHouseData = async () => {
        setState({
            loading: true,
        });
        const res = await requestApi('get', HOUSE_INDEX_API);
        if (res.data?.success) {
            setState({
                loading: false,
                house: res.data?.result.items,
            });
        }
    };

    const onDeleteHouse = async () => {
        const currentHouse = state.house.find(item => item.id === currentTab);
        const confirm = await NotifyUtil.confirmDialog(
            'Xóa nhà ' + currentHouse?.name,
            'Bạn có chắc chắn muốn xóa nhà này?',
        );
        if (confirm.isConfirmed) {
            const res = await requestApi('delete', `${HOUSE_DELETE_API}/${currentTab}`);
            if (res.data?.success) {
                NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
                setState({ fetchHouse: !state.fetchHouse });
                setCurrentTab(_.first(state.house)?.id);
                pushDomain({ search: qs.stringify({ tab: _.first(state.house)?.id }) });
                return;
            } else {
                NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
                return;
            }
        }
    };

    useEffect(() => {
        fetchHouseData();
        setState({ fetchHouse: false });
    }, [state.fetchHouse]);

    const handleOnFilter = debounce(() => {
        const formValues = formRef.current?.getFieldsValue();
        roomListViewRef.current?.onFilter(formValues);
    }, 300);

    if (state.loading) return <Loading />;
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
                        <BaseIcon icon={faHouse} />
                    </div>
                    <span className="font-semibold text-lg">Phòng</span>
                </div>
                <div className="flex items-center 2">
                    <ButtonBase
                        variant={'primary'}
                        title={'Khách thuê'}
                        startIcon={faUserGroup}
                        size="md"
                        onClick={() => pushDomain('/customer-list')}
                    />
                    <ButtonBase
                        onClick={onCreate}
                        className={'btn-create'}
                        variant={'success'}
                        title={'Thêm nhà'}
                        startIcon={faHouse}
                        size="md"
                    />
                </div>
            </div>
        );
    };

    return (
        <AppContainer title={renderTitle()} className="h-screen">
            <Fieldset title="Bộ lọc tìm kiếm">
                <BaseForm
                    ref={formRef}
                    className="mb-2 w-full"
                    baseFormItem={[
                        {
                            label: 'Mã phòng',
                            name: 'roomCode',
                            children: <Input onChange={handleOnFilter} placeholder="Nhập mã phòng ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Khách thuê',
                            name: 'customerName',
                            children: <Input onChange={handleOnFilter} placeholder="Nhập tên khách thuê ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Số hợp đồng',
                            name: 'contractNumber',
                            children: <Input onChange={handleOnFilter} placeholder="Nhập số hợp đồng ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Trạng thái',
                            name: 'status',
                            children: (
                                <Select
                                    onChange={handleOnFilter}
                                    options={[
                                        {
                                            value: 'New',
                                            label: 'Còn trống',
                                        },
                                        {
                                            value: 'Rented',
                                            label: 'Đã cho thuê',
                                        },
                                    ]}
                                    showSearch
                                    allowClear
                                    placeholder="Chọn trạng thái..."
                                />
                            ),
                            className: 'col-span-6',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={4}
                    isDisplayGrid={true}
                />
            </Fieldset>
            <Tabs
                onChange={key => {
                    pushDomain({ search: qs.stringify({ tab: key }) });
                    setCurrentTab(key);
                }}
                style={{ height: 220 }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
                type="card"
                className="h-full mt-2"
                tabBarExtraContent={{
                    right: state.house.length && (
                        <div className="flex-1 flex items-center justify-end mb-2">
                            <ButtonBase
                                onClick={() => roomListViewRef.current?.onCreate()}
                                className={'btn-create'}
                                variant={'success'}
                                title={'Thêm phòng'}
                                startIcon={faBed}
                                size="md"
                            />
                            <ButtonBase
                                onClick={updateHouse}
                                className={'btn-create'}
                                variant={'primary'}
                                title={'Cập nhật nhà'}
                                startIcon={faEdit}
                                size="md"
                            />
                            <ButtonBase
                                onClick={onDeleteHouse}
                                className={'btn-delete'}
                                variant={'danger'}
                                title={'Xóa nhà'}
                                startIcon={faTrash}
                                size="md"
                            />
                        </div>
                    ),
                }}
            >
                {state.house.length > 0 ? (
                    state.house.map(item => (
                        <Tabs.TabPane tab={item.name} key={item.id}>
                            <RoomListView ref={roomListViewRef} houseId={item.id} />
                        </Tabs.TabPane>
                    ))
                ) : (
                    <Tabs.TabPane className="h-full" tab={''}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <img src={emptyData} />
                        </div>
                    </Tabs.TabPane>
                )}
            </Tabs>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default RoomPage;
