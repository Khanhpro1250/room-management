import { useImperativeHandle, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { House } from '~/types/shared/House';

import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Loading from '~/component/Elements/loading/Loading';
import { Room } from '~/types/shared';
import { ROOM_DELETE_API, ROOM_INDEX_API } from '../api/room.api';
import RoomForm from './RoomForm';
import NotifyUtil from '~/util/NotifyUtil';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';

export interface RoomListViewRef {
    onFilter: (formValues: any) => void;
    onCreate: () => void;
    refreshData: () => void;
}

interface Props {
    houseId: string;
}

const RoomListView = React.forwardRef<RoomListViewRef, Props>((props, ref): JSX.Element => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<House>({
        url: ROOM_INDEX_API,
        gridRef: gridRef,
        params: { houseId: props.houseId },
    });

    const colDefs: BaseGridColDef[] = [
        {
            headerName: 'Mã phòng',
            field: nameof.full<Room>(x => x.roomCode),
            minWidth: 200,
            flex: 1,
        },
        {
            headerName: 'Số phòng',
            field: nameof.full<Room>(x => x.number),
            width: 150,
        },
        {
            headerName: 'Diện tích',
            field: nameof.full<Room>(x => x.acreage),
            width: 120,
        },
        {
            headerName: 'Số người ở tối đa',
            field: nameof.full<Room>(x => x.maxNumberOfPeople),
            width: 120,

            cellStyle: { textAlign: 'right' },
        },
        {
            headerName: 'Tiền cọc',
            field: nameof.full<Room>(x => x.deposit),
            minWidth: 120,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumSignificantDigits: 2 });
            },
        },
    ];

    useImperativeHandle(
        ref,
        () => ({
            onFilter: (formValues: any) => onFilter(formValues),
            refreshData: () => gridController?.reloadData(),
            onCreate,
        }),
        [],
    );

    const onCreate = () => {
        modalRef.current?.onOpen(
            <RoomForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
                parentId={props.houseId}
            />,
            'Tạo mới nhà',
            '50%',
        );
    };

    const onUpdate = (data: Room) => {
        modalRef.current?.onOpen(
            <RoomForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                    console.log(123123);
                }}
                onClose={modalRef.current?.onClose}
                parentId={props.houseId}
                initialValues={data}
            />,
            'Tạo mới nhà',
            '50%',
            icon(faEdit),
        );
    };

    const onFilter = (formValues: any) => {
        gridController?.setParams({ houseId: props.houseId, ...formValues });
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
        <>
            {gridController?.loading ? (
                <Loading />
            ) : (
                <>
                    <BaseGrid
                        columnDefs={colDefs}
                        data={gridController?.data}
                        ref={gridRef}
                        numberRows={true}
                        pagination={true}
                        actionRowsList={{
                            hasEditBtn: true,
                            hasDeleteBtn: true,
                            hasCreateChildBtn: true,
                            // onClickCreateChildBtn: onCreateChild,
                            onClickEditBtn: onUpdate,
                            onClickDeleteBtn: onDelete,
                        }}
                        actionRowsWidth={120}
                        // autoGroupColumnDef={autoGroupColumnDef}
                        // getDataPath={getDataPath}
                        groupDefaultExpanded={-1}
                    />
                    {/* <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickCreateButton={onCreate}
                            onClickRefreshButton={() => gridController?.reloadData()}
                        />
                    </BaseGrid> */}

                    <ModalBase ref={modalRef} />
                </>
            )}
        </>
    );
});

export default RoomListView;
