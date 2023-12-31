import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, FirstDataRenderedEvent, GetDataPath, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { faEdit, faFile, faPlus, faTrash, faUndo, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { GridReadyEvent, RowNode, RowSelectedEvent } from 'ag-grid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Popconfirm } from 'antd';
import _ from 'lodash';
import React, { ReactChild, useImperativeHandle } from 'react';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import './styles/BaseGrid.scss';

export interface BaseGridColDef extends ColDef, Partial<ColGroupDef> {}

ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

export interface BaseGridProps {
    pinAction?: boolean;
    columnDefs: BaseGridColDef[];
    gridOptions?: GridConfig | undefined;
    data: any[] | undefined;
    defaultColDef?: BaseGridColDef;
    gridConfig?: GridConfig;
    numberRows?: boolean;
    rowHeight?: number;
    rowSelection?: 'single' | 'multiple';
    onRowSelected?: (event: RowSelectedEvent) => void;
    onFirstDataRendered?: (params: FirstDataRenderedEvent) => void;
    isRowSelectable?: (rowNode: any) => boolean;
    onGridReady?: (event: GridReadyEvent) => void;
    actionRows?: boolean;
    actionRowsList?: {
        hasEditBtn?: boolean;
        hasDeleteBtn?: boolean;
        hasDetailBtn?: boolean;
        hasCreateChildBtn?: boolean;
        hasAddUserBtn?: boolean;
        hasWithdrawBtn?: (data: any, rowNode?: RowNode) => boolean;
        hasAddCustomerBtn?: (data: any, rowNode?: RowNode) => boolean;
        hasEditCustomerBtn?: (data: any, rowNode?: RowNode) => boolean;
        onClickEditBtn?: (data: any, rowNode?: RowNode) => void;
        onClickDeleteBtn?: (data: any, rowNode?: RowNode) => void;
        onClickDetailBtn?: (data: any, rowNode?: RowNode) => void;
        onClickCreateChildBtn?: (data: any, rowNode?: RowNode) => void;
        onClickAddUserBtn?: (data: any, rowNode?: RowNode) => void;
        onClickCustomerBtn?: (data: any, rowNode?: RowNode) => void;
        onClickEditCustomerBtn?: (data: any, rowNode?: RowNode) => void;
        onClickWithdrawBtn?: (data: any, rowNode?: RowNode) => void;
    };
    actionRowsWidth?: number;

    treeData?: boolean;
    getDataPath?: GetDataPath;
    groupDefaultExpanded?: number;
    autoGroupColumnDef?: ColDef<any>;
    pagination?: boolean;
    children?: ReactChild; // grid tool bar
}

interface GridConfig {}

export interface BaseGridRef extends AgGridReact {}

const BaseGrid = React.forwardRef<BaseGridRef, BaseGridProps>((props, ref) => {
    const { numberRows = true, actionRows = true, actionRowsList, pagination = true } = props;

    const customColDefs = (
        numberRows
            ? [
                  {
                      field: 'stt',
                      headerName: 'STT',
                      width: 60,
                      cellStyle: {
                          textAlign: 'center',
                      },
                      valueGetter: params => {
                          const rowIndex = _.get(params, 'node.rowIndex');

                          return Number(rowIndex) + 1;
                      },
                  },
              ]
            : []
    ) as BaseGridColDef[];

    customColDefs.push(...props.columnDefs);

    actionRows &&
        customColDefs.push({
            field: 'actionRows',
            headerName: 'Hành động',
            pinned: props.pinAction ? 'right' : undefined,
            width: props.actionRowsWidth ?? 100,
            cellStyle: {
                textAlign: 'center',
            },
            cellRenderer: (params: any) => {
                const data = _.get(params, 'data');
                const rowNode = _.get(params, 'node');
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        {actionRowsList?.hasWithdrawBtn?.(data, rowNode) && (
                            <ButtonBase
                                startIcon={faUndo}
                                variant={'warning'}
                                onClick={() => {
                                    actionRowsList.onClickWithdrawBtn?.(data, rowNode);
                                }}
                                tooltip="Trả phòng"
                            />
                        )}
                        {actionRowsList?.hasDetailBtn && (
                            <ButtonBase
                                startIcon={faFile}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickDetailBtn?.(data, rowNode);
                                }}
                                tooltip="Chi tiết"
                            />
                        )}
                        {actionRowsList?.hasCreateChildBtn && (
                            <ButtonBase
                                startIcon={faPlus}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickCreateChildBtn?.(data, rowNode);
                                }}
                                tooltip="Thêm dữ liệu con"
                            />
                        )}
                        {actionRowsList?.hasAddUserBtn && (
                            <ButtonBase
                                startIcon={faUserPlus}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickAddUserBtn?.(data, rowNode);
                                }}
                                tooltip="Thêm user"
                            />
                        )}
                        {actionRowsList?.hasAddCustomerBtn?.(data, rowNode) && (
                            <ButtonBase
                                startIcon={faUserPlus}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickCustomerBtn?.(data, rowNode);
                                }}
                                tooltip="Thêm khách thuê"
                            />
                        )}
                        {actionRowsList?.hasEditCustomerBtn?.(data, rowNode) && (
                            <ButtonBase
                                startIcon={faUserEdit}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickEditCustomerBtn?.(data, rowNode);
                                }}
                                tooltip="Sửa khách thuê"
                            />
                        )}
                        {actionRowsList?.hasEditBtn && (
                            <ButtonBase
                                startIcon={faEdit}
                                variant={'success'}
                                onClick={() => {
                                    actionRowsList.onClickEditBtn?.(data, rowNode);
                                }}
                                tooltip="Cập nhật"
                            />
                        )}
                        {actionRowsList?.hasDeleteBtn && (
                            <Popconfirm
                                placement="topRight"
                                title={'Bạn có chắc muốn xóa ?'}
                                onConfirm={e => actionRowsList.onClickDeleteBtn?.(data, rowNode)}
                                okText="Đồng ý"
                                cancelText="Đóng"
                            >
                                <ButtonBase startIcon={faTrash} variant={'danger'} />
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        });

    return (
        <div className="w-full h-[500px]">
            <div>{props.children}</div>
            <div className="w-full h-[94%] ag-theme-alpine grid base-grid mt-3">
                {props.data && (
                    <AgGridReact
                        ref={ref}
                        rowData={props.data}
                        autoGroupColumnDef={props.autoGroupColumnDef}
                        columnDefs={customColDefs}
                        // defaultColDef={{
                        //     resizable: true,
                        //     floatingFilter: false,
                        //     ...props.defaultColDef,
                        // }}
                        suppressAutoSize
                        pagination={pagination}
                        onGridReady={(params: any) => {
                            return props?.onGridReady?.(params);
                        }}
                        treeData={props.treeData}
                        animateRows
                        getDataPath={props.getDataPath}
                        groupDefaultExpanded={props.groupDefaultExpanded}
                        // detailCellRenderer
                        onFirstDataRendered={(params: any) => {
                            return props?.onFirstDataRendered?.(params);
                        }}
                        suppressRowClickSelection={true}
                        onRowSelected={(event: any) => {
                            return props?.onRowSelected?.(event);
                        }}
                        rowSelection={'multiple'}
                        gridOptions={props.gridOptions}
                        rowHeight={50}
                        {...props.gridConfig}
                    />
                )}
            </div>
        </div>
    );
});

export default BaseGrid;
