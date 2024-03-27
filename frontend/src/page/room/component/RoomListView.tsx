import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { House } from '~/types/shared/House';
import qs from 'qs';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '~/component/Elements/loading/Loading';
import NotificationConstant, { RoomStatus } from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Room } from '~/types/shared';
import NotifyUtil from '~/util/NotifyUtil';
import { ROOM_DELETE_API, ROOM_INDEX_API, ROOM_RETURN_API } from '../api/room.api';
import RoomForm from './RoomForm';
import { Status } from '~/component/Grid/Components/Status';
import { AppContainer } from '~/component/Layout/AppContainer';

export interface RoomListViewRef {
    onFilter: (formValues: any) => void;
    onCreate: (houseId: string) => void;
    refreshData: () => void;
    onExport: () => void;
}

interface Props {
    houseId: string;
}

const RoomListView = React.forwardRef<RoomListViewRef, Props>((props, ref): JSX.Element => {
    const location = useLocation();
    const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);

    const [houseId, setHouseId] = useState(tab?.toString() ?? props.houseId);

    const navigate = useNavigate();
    const gridController = useBaseGrid<House>({
        url: ROOM_INDEX_API,
        gridRef: gridRef,
        params: { houseId: houseId },
    });

    const colDefs: BaseGridColDef[] = [
        {
            headerName: 'Mã phòng',
            field: nameof.full<Room>(x => x.roomCode),
            width: 150,
        },
        {
            headerName: 'Diện tích (m2)',
            field: nameof.full<Room>(x => x.acreage),
            cellStyle: { textAlign: 'right' },
            width: 130,
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumFractionDigits: 2 });
            },
        },
        {
            headerName: 'Số người ở tối đa',
            field: nameof.full<Room>(x => x.maxNumberOfPeople),
            width: 145,
            cellStyle: { textAlign: 'right' },
        },
        {
            headerName: 'Giá',
            field: nameof.full<Room>(x => x.price),
            minWidth: 120,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumFractionDigits: 2 });
            },
        },
        {
            headerName: 'Mô tả',
            field: nameof.full<Room>(x => x.description),
            minWidth: 250,
            flex: 1,
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<Room>(x => x.status),
            // minWidth: 120,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Status status={params.value} statusName={params.data.statusName} />;
            },
        },
    ];

    useImperativeHandle(
        ref,
        () => ({
            onFilter: (formValues: any) => onFilter(formValues),
            refreshData: () => gridController?.reloadData(),
            onCreate,
            onExport: () => {
                gridRef.current?.api.exportDataAsExcel({
                    fileName: 'Danh sách phòng',
                    sheetName: 'Danh sách phòng',
                });
            },
        }),
        [],
    );

    const onCreate = (houseId: string) => {
        modalRef.current?.onOpen(
            <RoomForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
                parentId={houseId}
            />,
            'Tạo mới phòng',
            '50%',
            icon(faAdd),
        );
    };

    const onUpdate = (data: Room) => {
        modalRef.current?.onOpen(
            <RoomForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
                parentId={houseId}
                initialValues={data}
            />,
            'Cập nhật phòng',
            '50%',
            icon(faEdit),
        );
    };

    const onReturnRoom = async (data: Room) => {
        const res = await requestApi('put', `${ROOM_RETURN_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_RETURN_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
    };

    const onFilter = (formValues: any) => {
        gridController?.setParams({ houseId: houseId, ...formValues });
        gridController?.reloadData();
    };

    const onDelete = async (data: Room) => {
        const res = await requestApi('delete', `${ROOM_DELETE_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
    };

    return (
        <AppContainer className="!p-0 overflow-hidden" loading={gridController?.loading}>
            <div className="h-full">
                <BaseGrid
                    columnDefs={colDefs}
                    data={gridController?.data}
                    ref={gridRef}
                    pinAction
                    numberRows={true}
                    reloadData={gridController?.reloadData}
                    rowHeight={40}
                    pagination={true}
                    actionRowsList={{
                        // hasDetailBtn: true,
                        hasEditBtn: true,
                        hasDeleteBtn: true,
                        hasWithdrawBtn(data, rowNode) {
                            return data.status === RoomStatus.Rented;
                        },
                        hasAddCustomerBtn(data) {
                            return data.status === RoomStatus.New;
                        },
                        hasEditCustomerBtn(data, rowNode) {
                            return data.status !== RoomStatus.New;
                        },
                        onClickEditCustomerBtn: (data: Room) => {
                            navigate(`/customer?roomId=${data.id}`);
                        },
                        onClickCustomerBtn: (data: Room) => {
                            navigate(`/customer?roomId=${data.id}`);
                        },
                        onClickWithdrawBtn: onReturnRoom,
                        // onClickDetailBtn: onDetail,
                        onClickEditBtn: onUpdate,
                        onClickDeleteBtn: onDelete,
                    }}
                    actionRowsWidth={200}
                    groupDefaultExpanded={-1}
                />
                <ModalBase ref={modalRef} />
            </div>
        </AppContainer>
        // <>
        //     {gridController?.loading ? (
        //         <Loading />
        //     ) : (

        //     )}
        // </>
    );
});

export default RoomListView;
