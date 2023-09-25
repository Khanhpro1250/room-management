import { faHouse, faList, faSync, faUserGear, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Input, Tabs } from 'antd';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import Loading from '~/component/Elements/loading/Loading';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useMergeState } from '~/hook/useMergeState';
import { requestApi } from '~/lib/axios';
import { RoomListViewRef } from '~/page/room/component/RoomListView';
import { ComboOption, Room } from '~/types/shared';
import { HOUSE_COMBO_API } from '../house/api/house.api';
import HomeForm from '../house/components/HomeForm';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import NotificationConstant from '~/configs/contants';
import TextArea from 'antd/lib/input/TextArea';

const RoomListView = React.lazy(() => import('~/page/room/component/RoomListView'));

interface State {
    loading: boolean;
    fetchHouse: boolean;
    house: ComboOption[];
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

    const currTab = state.house[0]?.value;

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

    const fetchComBoPermission = async () => {
        const res = await requestApi('get', HOUSE_COMBO_API);
        if (res.data?.success) {
            setState({
                loading: false,
                house: res.data?.result,
            });
        }
    };

    useEffect(() => {
        fetchComBoPermission();
        setState({ fetchHouse: false });
    }, [state.fetchHouse]);
    if (state.loading) return <Loading />;

    return (
        <AppContainer className="body-page h-full overflow-auto">
            <BaseForm
                ref={formRef}
                className="mb-2"
                baseFormItem={[
                    {
                        label: 'Mã phòng',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input className="col-6" placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Mã phòng',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Mã phòng',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input className="col-6" placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Trạng thái',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                isHasFieldSet
            />
            <Tabs
                onChange={key => {
                    pushDomain({ search: qs.stringify({ tab: key }) });
                    setCurrentTab(key);
                }}
                defaultActiveKey={tab ? String(tab) : (currTab as string)}
                type="card"
                tabBarExtraContent={{
                    right: (
                        <div className="flex-1 flex items-center justify-end">
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
                    ),
                }}
            >
                {state.house.map(item => (
                    <Tabs.TabPane tab={item.label} key={item.value}>
                        <RoomListView ref={roomListViewRef} houseId={item.value} />
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default RoomPage;
