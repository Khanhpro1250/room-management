import { useRef } from 'react';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { House } from '~/types/shared/House';
import { HOUSE_INDEX_API } from './api/house.api';

const HouseListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<House>({
        url: HOUSE_INDEX_API,
        gridRef: gridRef,
    });

    const MenuColDefs: BaseGridColDef[] = [
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
                            // onClickCreateButton={onCreate}
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
