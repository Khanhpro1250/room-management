import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, FirstDataRenderedEvent, GetDataPath, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import {
    faEdit,
    faFile,
    faPlus,
    faRotate,
    faTrash,
    faUndo,
    faUserEdit,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { GridReadyEvent, RowNode, RowSelectedEvent } from 'ag-grid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Popconfirm } from 'antd';
import _ from 'lodash';
import React, { ReactChild } from 'react';
import { ButtonBase, ButtonProps, sizes, variants } from '../Elements/Button/ButtonBase';
import { BaseIcon } from '../Icon/BaseIcon';
import './styles/BaseGrid.scss';
import { ICellRendererParams } from 'ag-grid-community';
import Button, { ButtonType } from 'antd/lib/button';
import { IEntity } from '~/types/shared/AuditedEntity';

export interface BaseGridColDef extends ColDef, Partial<ColGroupDef> {}

ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

export interface BaseGridProps {
    actionWidth?: number;
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
    reloadData?: () => void;
    actionRowsReRender?: IActionRows[];
}
export type IActionRows = {
    isHidden?: (data: any) => boolean;
    type?: ButtonType;
    style?: React.CSSProperties;
    name?: string;
    onClick: (data: any, rowNode?: RowNode) => void;
    icon?: JSX.Element;
    danger?: boolean;
    isConfirm?: boolean;
} & ButtonProps;

interface GridConfig {}

export interface BaseGridRef extends AgGridReact {}

const BaseGrid = React.forwardRef<BaseGridRef, BaseGridProps>((props, ref) => {
    const { numberRows = true, actionRows = true, actionRowsList, pagination = true, actionRowsReRender } = props;

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

    actionRowsReRender && renderAdditionColumn(actionRowsReRender, customColDefs, props.actionWidth);

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
                            <Popconfirm
                                placement="topRight"
                                title={'Bạn có chắc muốn trả phòng ?'}
                                onConfirm={e => actionRowsList.onClickWithdrawBtn?.(data, rowNode)}
                                okText="Đồng ý"
                                cancelText="Đóng"
                            >
                                <ButtonBase startIcon={faUndo} variant={'warning'} tooltip="Trả phòng" />
                            </Popconfirm>
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
                    <div className="relative base-grid ">
                        <AgGridReact
                            ref={ref}
                            rowData={props.data}
                            autoGroupColumnDef={props.autoGroupColumnDef}
                            columnDefs={customColDefs}
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
                            paginateChildRows={true}
                            paginationPageSize={20}
                            paginationAutoPageSize
                            {...props.gridConfig}
                        />

                        {pagination && (
                            <BaseIcon
                                className="absolute font-thin cursor-pointer text-gray-600 bottom-[17px] right-[340px]"
                                icon={faRotate}
                                onClick={() => {
                                    props.reloadData?.();
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

const renderAdditionColumn = (actionRows: IActionRows[], columnDefs: ColDef[], actionWidth?: number): void => {
    if (actionRows && actionRows.length !== 0) {
        const actions = {
            field: 'actionRows',
            headerName: 'Hành động',
            pinned: 'right',
            width: actionWidth ?? 150,
            cellStyle: {
                textAlign: 'center',
            },
            cellRenderer: (params: ICellRendererParams) => {
                const data = _.get(params, 'data');
                const rowNode = _.get(params, 'node') as any;
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        {actionRows?.map((item: IActionRows, index) => {
                            const { isConfirm, onClick, isHidden, ...actionProps } = item;
                            if (isHidden && isHidden(data)) {
                                return null;
                            }
                            return item.isConfirm ? (
                                <Popconfirm
                                    key={index}
                                    placement="left"
                                    title="Bạn có chắc xóa?"
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                    onConfirm={() => onClick(params.data)}
                                >
                                    <ButtonBase
                                        startIcon={item?.startIcon}
                                        variant={item?.variant}
                                        tooltip={item?.tooltip}
                                        title={item?.title}
                                    />
                                </Popconfirm>
                            ) : (
                                <ButtonBase
                                    startIcon={item?.startIcon}
                                    variant={item?.variant}
                                    onClick={() => {
                                        item.onClick?.(data, rowNode);
                                    }}
                                    tooltip={item?.tooltip}
                                    title={item?.title}
                                />
                            );
                        })}
                    </div>
                );
            },
        } as ColDef;
        columnDefs.push(actions);
        columnDefs.push({ field: nameof<IEntity>(x => x.id), hide: true } as ColDef);
    }
};

export default BaseGrid;
