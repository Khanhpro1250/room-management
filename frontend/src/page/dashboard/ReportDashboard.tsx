import { faPieChart } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { AppContainer } from '~/component/Layout/AppContainer';
import RoomStateChart from './RoomStateChart';
import ReportRevenueChart from './ReportRevenueChart';

type Props = {};

const ReportDashboard: React.FC<Props> = (props: Props) => {
    const formRef = useRef<BaseFormRef>(null);

    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div>
                    <div
                        className={
                            'text-sm inline-flex items-center font-bold leading-sm ' +
                            'uppercase px-[8px] py-[5px] bg-[#73737320] text-[#737373] rounded-md mr-1'
                        }
                    >
                        <BaseIcon icon={faPieChart} />
                    </div>
                    <span className="font-semibold text-lg">Tổng quan</span>
                </div>
            </div>
        );
    };
    return (
        <AppContainer title={renderTitle()}>
            <div className={'container-dash-board'}>
                {/* <Fieldset title="Bộ lọc tìm kiếm">
                    <BaseForm
                        ref={formRef}
                        className="mb-2 w-full"
                        baseFormItem={[
                            {
                                label: 'Tháng/năm',
                                name: 'dateTime',
                                initialValue: moment(),
                                children: (
                                    <DatePicker
                                        clearIcon={false}
                                        // onChange={handleChangeData}
                                        className="w-full"
                                        format={'MM/yyyy'}
                                        picker="month"
                                    />
                                ),
                                className: 'col-span-4',
                            },
                            {
                                label: 'Nhà',
                                name: 'houseId',
                                children: (
                                    <Select
                                        // onChange={handleChangeData}
                                        defaultValue={null}
                                        options={[
                                            {
                                                value: null,
                                                label: 'Tất cả',
                                            },
                                        ]}
                                    />
                                ),
                                className: 'col-span-4',
                            },
                            {
                                label: 'Mã phòng',
                                name: 'roomCode',
                                // children: <Input onChange={handleChangeData} placeholder="Nhập mã phòng ..." />,
                                className: 'col-span-4',
                            },
                        ]}
                        labelAlign="left"
                        labelCol={2}
                        isDisplayGrid={true}
                    />
                </Fieldset> */}
                <div className="container-body !p-[1px] !pr-1 grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <RoomStateChart />
                    </div>
                    <div className="col-span-6">
                        <ReportRevenueChart />
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default ReportDashboard;
