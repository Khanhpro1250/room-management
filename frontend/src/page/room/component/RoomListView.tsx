import { useImperativeHandle, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { House } from '~/types/shared/House';

import React from 'react';
import { ROOM_INDEX_API } from '../api/room.api';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import Loading from '~/component/Elements/loading/Loading';
import RoomForm from './RoomForm';
import { Room } from '~/types/shared';

export interface RoomListViewRef {
    onFilter: (formValues: any) => void;
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
            minWidth: 500,
        },
        {
            headerName: 'Số phòng',
            field: nameof.full<Room>(x => x.number),
            width: 120,
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
        },
        {
            headerName: 'Tiền cọc',
            field: nameof.full<Room>(x => x.deposit),
            width: 120,
        },
    ];

    useImperativeHandle(
        ref,
        () => ({
            onFilter: (formValues: any) => onFilter(formValues),
            refreshData: () => gridController?.reloadData(),
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

    const onFilter = (formValues: any) => {
        gridController?.setParams({ houseId: props.houseId, ...formValues });
        gridController?.reloadData();
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
                            // onClickEditBtn: onUpdate,
                            // onClickDeleteBtn: onDelete,
                        }}
                        actionRowsWidth={120}
                        // autoGroupColumnDef={autoGroupColumnDef}
                        // getDataPath={getDataPath}
                        groupDefaultExpanded={-1}
                    >
                        <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickCreateButton={onCreate}
                            onClickRefreshButton={() => gridController?.reloadData()}
                        />
                    </BaseGrid>
                    <ModalBase ref={modalRef} />
                </>
            )}
        </>
    );
});

export default RoomListView;
