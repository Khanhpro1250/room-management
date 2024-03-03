import { faPieChart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { AppContainer } from '~/component/Layout/AppContainer';
import ReportContractAboutExpire from './ReportContractAboutExpire';
import ReportRevenueChart from './ReportRevenueChart';
import RoomStateChart from './RoomStateChart';
import ReportTotalSpendAmount from './ReportTotalSpendAmount';

type Props = {};

const ReportDashboard: React.FC<Props> = (props: Props) => {
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
            <div className={'container-dash-board pb-6'}>
                <div className="container-body !pr-1 grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <RoomStateChart />
                    </div>
                    <div className="col-span-6">
                        <ReportRevenueChart />
                    </div>
                    <div className="col-span-6">
                        <ReportContractAboutExpire />
                    </div>
                    <div className="col-span-6">
                        <ReportTotalSpendAmount />
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default ReportDashboard;
