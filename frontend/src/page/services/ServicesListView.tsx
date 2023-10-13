import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useRef } from 'react';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';
import { SERVICE_INDEX_API } from './api/services.api';

const ServicesListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<Service>({
        url: SERVICE_INDEX_API,
        gridRef: gridRef,
    });

    const onCreate = () => {
        // modalRef.current?.onOpen(
        //     <MenuForm
        //         onSubmitSuccessfully={() => {
        //             modalRef.current?.onClose();
        //             gridController?.reloadData();
        //         }}
        //         // initialValues={{
        //         //     icon: 'list-ul',
        //         // }}
        //         onClose={modalRef.current?.onClose}
        //     />,
        //     'Tạo mới Menu',
        //     '50%',
        // );
    };

    // const onUpdate = (data: Menu) => {
    //     modalRef.current?.onOpen(<></>, 'Cập nhật Menu', '50%');
    // };

    // const onDelete = (data: Menu) => {
    //     baseDeleteApi(MENU_DELETE_API, data.id);
    //     gridController?.reloadData();
    // };

    // const onCreateChild = (data: Menu) => {
    // modalRef.current?.onOpen(
    //     <MenuForm
    //         parentId={_.get(data, 'id')}
    //         onSubmitSuccessfully={() => {
    //             modalRef.current?.onClose();
    //             gridController?.reloadData();
    //         }}
    //         onClose={modalRef.current?.onClose}
    //     />,
    //     `Thêm Menu con cho Menu - ${data.name}`,
    //     '50%',
    // );
    // };

    const ServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Tên',
            field: nameof.full<Service>(x => x.name),
            minWidth: 500,
        },
        {
            headerName: 'Loại dịch vụ',
            field: nameof.full<Service>(x => x.type),
            width: 120,
        },
        {
            headerName: 'Đơn giá',
            field: nameof.full<Service>(x => x.price),
            width: 120,
        },
        {
            headerName: 'Đơn vị tính',
            field: nameof.full<Service>(x => x.unit),
            width: 120,
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<Service>(x => x.status),
            width: 120,
            cellRenderer: (params: any) => {
                <Checkbox disabled checked={params.value} />;
            },
        },
    ];

    return (
        <AppContainer>
            {gridController?.loading ? (
                <Loading />
            ) : (
                <>
                    <BaseGrid
                        columnDefs={ServiceColDefs}
                        data={[]}
                        // ref={gridRef}
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
                        // treeData
                        actionRowsWidth={120}
                        // autoGroupColumnDef={autoGroupColumnDef}
                        // getDataPath={getDataPath}
                        // groupDefaultExpanded={-1}
                    >
                        <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickCreateButton={onCreate}
                            // onClickRefreshButton={() => gridController?.reloadData()}
                        />
                    </BaseGrid>
                    <ModalBase ref={modalRef} />
                </>
            )}
        </AppContainer>
    );
};

export default ServicesListView;
