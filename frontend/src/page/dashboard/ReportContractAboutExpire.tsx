import { faFileExport, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { useBaseGrid } from '~/hook/useBaseGrid';

interface IProps {}

const ReportContractAboutExpire = (props: IProps) => {
    const gridRef = useRef<BaseGridRef>(null);
    const gridController = useBaseGrid<any>({
        url: 'api/report/contract-expire',
        gridRef: gridRef,
    });

    const CustomerListViewColumnDefs: BaseGridColDef[] = [
        {
            headerName: 'Nhà',
            field: 'houseName',
            minWidth: 150,
        },
        {
            headerName: 'Phòng',
            field: 'roomCode',
            minWidth: 150,
        },
        {
            headerName: 'Họ và tên',
            field: 'customerName',
            minWidth: 150,
        },
        {
            headerName: 'Ngày hết hạn',
            field: 'expiredDate',
            width: 200,
            cellRenderer: (params: any) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
    ];

    const onExportExcel = () => {
        gridRef.current?.api.exportDataAsExcel({
            fileName: 'Danh sách khách đến hạn hợp đồng',
            sheetName: 'Danh sách khách đến hạn hợp đồng',
        });
    };

    if (gridController?.loading) return <Loading />;

    return (
        <div className="mt-2 border p-4">
            <div className="relative flex">
                <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Khách sắp hết hạn hợp đồng</div>
                <div className="absolute flex top-[1px] right-0">
                    <ButtonBase
                        variant="warning"
                        tooltip="Xuất dữ liệu"
                        // size="md"
                        startIcon={faFileExport}
                        onClick={onExportExcel}
                    />
                    <ButtonBase
                        variant="info"
                        tooltip="Gửi mail nhắc nhớ đến hạn hợp đồng"
                        // size="md"
                        startIcon={faPaperPlane}
                        onClick={onExportExcel}
                    />
                </div>
            </div>
            <hr />
            <div className="dashboard-unit flex">
                <BaseGrid
                    columnDefs={CustomerListViewColumnDefs}
                    data={gridController?.data || []}
                    ref={gridRef}
                    numberRows={true}
                    // height="300px"
                    pagination={true}
                    actionRows={false}
                    reloadData={gridController?.reloadData}
                />
            </div>
        </div>
    );
};

export default ReportContractAboutExpire;
