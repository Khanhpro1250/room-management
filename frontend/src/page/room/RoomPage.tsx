import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBed, faEdit, faHouse, faList, faSearch, faTrash, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Input, Tabs } from 'antd';
import _ from 'lodash';
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
        const currentHouse = state.house.find(item => item.id === (currentTab || currTab));
        const confirm = await NotifyUtil.confirmDialog(
            'Xóa nhà ' + currentHouse?.name,
            'Bạn có chắc chắn muốn xóa nhà này?',
        );
        if (confirm.isConfirmed) {
            const res = await requestApi('delete', `${HOUSE_DELETE_API}/${currentTab}`);
            if (res.data?.success) {
                NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
                setState({ fetchHouse: !state.fetchHouse });
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

    const onFiler = () => {
        roomListViewRef.current?.onFilter(formRef.current?.getFieldsValue());
    };
    if (state.loading) return <Loading />;

    return (
        <AppContainer className="body-page h-full overflow-auto">
            <div className="flex-1 flex items-center justify-end mb-2">
                <ButtonBase
                    variant={'primary'}
                    title={'Khách thuê'}
                    startIcon={faUserGroup}
                    size="md"
                    onClick={() => roomListViewRef.current?.refreshData()}
                />
                <ButtonBase
                    variant={'primary'}
                    title={'Phòng'}
                    startIcon={faList}
                    size="md"
                    onClick={() => roomListViewRef.current?.refreshData()}
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
            <Fieldset title="Bộ lọc tìm kiếm">
                <BaseForm
                    ref={formRef}
                    className="mb-2 w-full"
                    baseFormItem={[
                        {
                            label: 'Mã phòng',
                            name: 'roomCode',
                            children: <Input placeholder="Nhập mã phòng ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Khách thuê',
                            name: 'customerName',
                            children: <Input placeholder="Nhập tên khách thuê ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Số hợp đồng',
                            name: 'contractNo',
                            children: <Input placeholder="Nhập số hợp đồng ..." />,
                            className: 'col-span-6',
                        },
                        {
                            label: 'Trạng thái',
                            name: 'status',
                            children: <Input placeholder="Nhập mã phòng ..." />,
                            className: 'col-span-6',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={4}
                    isDisplayGrid={true}
                />
                <div className="flex justify-center">
                    <ButtonBase
                        variant={'primary'}
                        title={'Tìm kiếm'}
                        startIcon={faSearch}
                        size="md"
                        onClick={onFiler}
                    />
                </div>
            </Fieldset>
            <Tabs
                onChange={key => {
                    pushDomain({ search: qs.stringify({ tab: key }) });
                    setCurrentTab(key);
                }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
                type="card"
                tabBarExtraContent={{
                    right: (
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
                {state.house.map(item => (
                    <Tabs.TabPane tab={item.name} key={item.id}>
                        <RoomListView ref={roomListViewRef} houseId={item.id} />
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default RoomPage;
