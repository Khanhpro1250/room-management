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

export interface RoomListViewRef {
    onFilterChange: (formValues: any) => void;
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
            headerName: 'Tên nhà',
            field: nameof.full<House>(x => x.name),
            minWidth: 500,
        },
        {
            headerName: 'Địa chỉ',
            field: nameof.full<House>(x => x.location),
            width: 120,
        },
        {
            headerName: 'Loại nhà',
            field: nameof.full<House>(x => x.houseTypeName),
            width: 120,
        },
        {
            headerName: 'Hình ảnh',
            field: nameof.full<House>(x => x.imgLink),
            width: 120,
            cellRenderer: (params: any) => {
                return <img style={{ width: '100%', height: '100%' }} src={params.value} />;
            },
        },
    ];

    useImperativeHandle(
        ref,
        () => ({
            onFilterChange: (formValues: any) => onFilterChange(formValues),
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

    const onFilterChange = (formValues: any) => {
        gridController?.setParams(formValues);
        gridController?.reloadData();
    };

    return (
        <div className="overflow-auto p-0">
            {gridController?.loading ? (
                <Loading />
            ) : (
                <>
                    <BaseGrid
                        columnDefs={colDefs}
                        data={gridController?.data}
                        ref={gridRef}
                        numberRows={false}
                        pagination={false}
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
        </div>
    );
});

export default RoomListView;
