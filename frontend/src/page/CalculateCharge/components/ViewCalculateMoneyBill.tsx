import { faAngleDown, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo, useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';

import { Dropdown, Menu } from 'antd';
import DomToImage from 'dom-to-image';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { CALCULATE_SENT_BILL } from '../api/calculate.api';
import { useGetDetailCalculateChargeBill } from '../api/useGetDetailCalculateChargeBill';
import { useSelector } from 'react-redux';
import { RootState } from '~/AppStore';
interface Props {
    initialValues?: any;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    onExport: () => void;
}

const ViewCalculateMoneyBill: React.FC<Props> = props => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { authUser } = useSelector((state: RootState) => state.authData);
    const { data: calculateChargeRes, isFetching } = useGetDetailCalculateChargeBill(props.initialValues?.id);
    const overlayRef = useRef<OverlayRef>(null);
    const data = useMemo(() => calculateChargeRes?.data?.result, [isFetching]);

    const exportDom = (filename: string) => {
        containerRef.current &&
            DomToImage.toJpeg(containerRef.current, { quality: 1, bgcolor: 'white' })
                .then((dataUrl: string) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = filename + '.png';
                    link.click();
                    URL.revokeObjectURL(dataUrl);
                })
                .catch(error => {
                    console.error('oops, something went wrong!', error);
                });
    };

    const onSent = async (data: any) => {
        overlayRef.current?.open?.();
        const res = await requestApi('get', `${CALCULATE_SENT_BILL}/${props.initialValues?.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, 'Hóa đơn đã được gửi đến ' + data.customerName);
            overlayRef.current?.close?.();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            overlayRef.current?.close?.();
            return;
        }
    };

    const menu = (
        <Menu>
            <Menu.Item
                className="hover:bg-slate-300"
                onClick={() => {
                    exportDom('Hoa-don');
                }}
                key="img"
            >
                <div className="flex items-center justify-start">
                    <span>Ảnh hóa đơn</span>
                </div>
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    overlayRef.current?.open?.();
                    props.onExport?.();
                    overlayRef.current?.close?.();
                }}
                className="hover:bg-slate-300"
                key="pdf"
            >
                <div className="flex items-center justify-start">
                    <span>File pdf</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <AppModalContainer loading={isFetching}>
            <div ref={containerRef}>
                <div className="p-2">
                    <div>
                        <span className="text-xs text-sky-950 font-bold">Nhà: {data?.houseName}</span>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-xs text-sky-950 font-bold">{data?.houseAddress}</div>
                        <div className="text-xs text-sky-950">{data?.dateCalculate}</div>
                    </div>
                    <div>
                        <div className="uppercase text-xl text-sky-950 font-bold mt-2 text-center">
                            Hóa đơn tiền nhà
                        </div>
                        <div>
                            <div className=" text-xs text-sky-950 font-bold mt-2 text-center">
                                Tháng {data?.month}/{data?.year}
                            </div>
                            <div className=" text-xs text-sky-950 text-center">
                                (từ ngày {data?.calculateFromDate} đến ngày {data?.calculateToDate})
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="text-xs mb-1  text-sky-950 font-bold">Họ và tên: {data?.customerName}</div>
                        <div className="text-xs mb-1   text-sky-950 font-bold">Phòng: {data?.roomCode}</div>
                        <div className="text-xs mb-1  text-sky-950 font-bold">Ngày vào: {data?.dateCustomerMoveIn}</div>
                    </div>
                    <hr />
                    <div className="mt-2 mb-2">
                        {data?.calculateChargeDetails?.map((item, index) => {
                            return (
                                <div key={index} className="flex justify-between mb-2">
                                    <div className="text-xs text-sky-950">
                                        {index + 1} . {item.title}{' '}
                                        {`${item.description && '(' + item.description + ')'}`}
                                    </div>
                                    <div className="text-xs text-sky-950">{item.cost}</div>
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className="mb-6">
                        <div className="flex justify-between mt-2">
                            <div className="uppercase text-2xl text-sky-950 font-bold  ">Tổng cộng</div>

                            <div className="uppercase text-2xl text-sky-950 font-bold ">{data?.totalCost}</div>
                        </div>
                        <div className="flex float-end">
                            <i className="text-xs text-sky-950">( Bằng chữ : {data?.totalCostWord} )</i>
                        </div>
                    </div>
                    {authUser?.user?.bankAccount && (
                        <>
                            <hr className="mt-2" />
                            <div className="mt-2 mb-4">
                                <div className="text-sm mb-1  text-sky-950 font-bold">Thông tin số tài khoản </div>
                                <div className="flex mb-2">
                                    <div className="text-xs font-bold text-sky-950 mr-2">Ngân hàng: </div>
                                    <div className="text-xs text-sky-950">{authUser?.user?.bankBranch}</div>
                                </div>
                                <div className="flex mb-2">
                                    <div className="text-xs font-bold text-sky-950 mr-2">Số tài khoản: </div>
                                    <div className="text-xs text-sky-950 mr-1">{authUser?.user?.bankAccount}</div>
                                    <div className="text-xs text-sky-950 ">- [ {authUser?.user?.bankAccountName} ]</div>
                                </div>
                                <div className="flex mb-2">
                                    <div className="text-xs font-bold text-sky-950 mr-2">Số điện thoại liên hệ: </div>
                                    <div className="text-xs text-sky-950">{authUser?.user?.phoneNumber}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center w-full">
                <Dropdown overlay={menu}>
                    <ButtonBase title="Tải file" endIcon={faAngleDown} variant="primary" />
                </Dropdown>
                <ButtonBase startIcon={faPaperPlane} title="Gửi hóa đơn" onClick={() => onSent(data)} />
                <ButtonBase title="Đóng" startIcon={faClose} variant="danger" onClick={props.onClose} />
            </div>
            <Overlay ref={overlayRef} />
        </AppModalContainer>
    );
};

export default ViewCalculateMoneyBill;
