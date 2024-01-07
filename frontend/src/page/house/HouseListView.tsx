import _ from 'lodash';
import { useRef } from 'react';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { House } from '~/types/shared/House';
import { HOUSE_INDEX_API } from './api/house.api';
import HomeForm from './components/HomeForm';

const HouseListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<House>({
        url: HOUSE_INDEX_API,
        gridRef: gridRef,
    });

    const onCreate = () => {
        modalRef.current?.onOpen(
            <HomeForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Tạo mới nhà',
            '50%',
        );
    };

    const onCreateChild = (data: House) => {
        modalRef.current?.onOpen(
            <HomeForm
                parentId={_.get(data, 'id')}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            `Thêm phòng cho nhà - ${data.name}`,
            '50%',
        );
    };

    const MenuColDefs: BaseGridColDef[] = [
        {
            headerName: 'Tên nhà',
            field: nameof.full<House>(x => x.name),
        },
        {
            headerName: 'Địa chỉ',
            field: nameof.full<House>(x => x.location),
        },
        {
            headerName: 'Loại nhà',
            field: nameof.full<House>(x => x.houseTypeName),
        },
        {
            headerName: 'Hình ảnh',
            field: nameof.full<House>(x => x.imgLink),

            cellRenderer: (params: any) => {
                return <img style={{ width: '100%', height: '100%' }} src={params.value} />;
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
                        columnDefs={MenuColDefs}
                        data={gridController?.data}
                        ref={gridRef}
                        numberRows={false}
                        pagination={false}
                        actionRowsList={{
                            hasEditBtn: true,
                            hasDeleteBtn: true,
                            hasCreateChildBtn: true,
                            onClickCreateChildBtn: onCreateChild,
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
        </AppContainer>
    );
};

export default HouseListView;
