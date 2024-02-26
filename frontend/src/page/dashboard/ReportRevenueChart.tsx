import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption, SeriesOption } from 'echarts';
import { RefObject, useMemo, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/component/Echart/ReactECharts';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';

import DomToImage from 'dom-to-image';
import { MoneyUtil } from '~/util/MoneyUtil';
import { useReportRevenue } from './hooks/useReportRevenue';
import Loading from '~/component/Elements/loading/Loading';
import { Select } from 'antd';
interface IProps {}
interface IState {
    deActiveButton: Array<string>;
}

const getDistinctHouses = (data: any) => {
    const houses = new Set();
    data.forEach((monthData: any) => {
        monthData.details.forEach((detail: any) => {
            houses.add(JSON.stringify({ code: detail.houseId, name: detail.houseName }));
        });
    });
    return Array.from(houses).map((house: any) => JSON.parse(house));
};

const getDistinctMonths = (data: any) => {
    const monthsSet = new Set();
    data.forEach((entry: any) => {
        monthsSet.add(JSON.stringify(entry.month));
    });
    return Array.from(monthsSet).map((month: any) => JSON.parse(month));
};
const ReportRevenueChart = (props: IProps) => {
    const chartRef = useRef<ReactEChartsRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: dataResponse, isFetching: isLoadingData } = useReportRevenue();
    const dataReportRevenue = useMemo(() => dataResponse?.data?.result ?? [], [dataResponse]);

    const mockData = [
        {
            month: {
                month: 2,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 2,
                    year: 2024,
                    revenue: 21000,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                    houseName: 'Nhà 2',
                    month: 2,
                    year: 2024,
                    revenue: 10100,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 3',
                    month: 2,
                    year: 2024,
                    revenue: 10100,
                },
            ],
        },
        {
            month: {
                month: 3,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 3,
                    year: 2024,
                    revenue: 41000,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                    houseName: 'Nhà 2',
                    month: 3,
                    year: 2024,
                    revenue: 111000,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 3',
                    month: 3,
                    year: 2024,
                    revenue: 14100,
                },
            ],
        },
        {
            month: {
                month: 4,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 4,
                    year: 2024,
                    revenue: 21000,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                    houseName: 'Nhà 2',
                    month: 4,
                    year: 2024,
                    revenue: 10100,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 3',
                    month: 4,
                    year: 2024,
                    revenue: 10100,
                },
            ],
        },
        {
            month: {
                month: 5,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 5,
                    year: 2024,
                    revenue: 21000,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                    houseName: 'Nhà 2',
                    month: 5,
                    year: 2024,
                    revenue: 10100,
                },
                // {
                //     houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                //     houseName: 'Nhà 3',
                //     month: 5,
                //     year: 2024,
                //     revenue: 10100,
                // },
            ],
        },
        {
            month: {
                month: 6,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 6,
                    year: 2024,
                    revenue: 21000,
                },
                // {
                //     houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                //     houseName: 'Nhà 2',
                //     month: 6,
                //     year: 2024,
                //     revenue: 10100,
                // },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 3',
                    month: 6,
                    year: 2024,
                    revenue: 10100,
                },
            ],
        },
        {
            month: {
                month: 7,
                year: 2024,
            },
            details: [
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0eaf',
                    houseName: 'Nhà 1',
                    month: 7,
                    year: 2024,
                    revenue: 21000,
                },
                // {
                //     houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea1',
                //     houseName: 'Nhà 2',
                //     month: 6,
                //     year: 2024,
                //     revenue: 10100,
                // },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 3',
                    month: 7,
                    year: 2024,
                    revenue: 10100,
                },
            ],
        },
    ];

    const renderEChart = (data: any[], chartRef: RefObject<ReactEChartsRef>, wrapperRef: RefObject<HTMLDivElement>) => {
        const NO_INDEX = -1;
        const DEFAULT_VALUES = 0;

        const houses = getDistinctHouses(data);
        const months = getDistinctMonths(data);

        const dataXAxis = months.map((month: any) => {
            return `${month.month}/${month.year}`;
        });

        const series: SeriesOption[] = [];
        houses.forEach(houseItem => {
            const houseData: number[] = [];
            const itemSeries: SeriesOption = {
                name: houseItem.name,
                type: 'bar',
                data: houseData,
            };
            months?.forEach(month => {
                const index = data.findIndex(
                    monthData => monthData.month.month === month.month && monthData.month.year === month.year,
                );
                const indexOrg = data[index]?.details?.findIndex((item: any) => {
                    return item.houseId === houseItem.code;
                });
                const value = indexOrg > NO_INDEX ? data[index]?.details[indexOrg]?.revenue : DEFAULT_VALUES;
                houseData.push(value);
            });
            series.push(itemSeries);
        });

        const option = {
            legend: {
                type: 'scroll',
                top: 40,
                right: 10,
                bottom: 20,
                orient: 'vertical',
            },
            tooltip: {
                valueFormatter(value) {
                    return value?.toLocaleString('vi', { maximumFractionDigits: 0 });
                },
                textStyle: {
                    fontFamily: 'lato, helvetica, arial, verdana, sans-serif, "FontAwesome"',
                    color: '#ffff',
                },
                backgroundColor: 'rgb(64,64,64)',
                borderWidth: 0,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },

            grid: {
                bottom: 40,
                left: 100,
                containLabel: true,
            },
            xAxis: {
                data: dataXAxis,
                axisLabel: {
                    interval: 0, // Show all labels
                },
                axisTick: {
                    alignWithLabel: true, // Align ticks with labels
                },
                // Enable horizontal scrolling when overflow
                overflow: 'scroll',
            },
            yAxis: {
                axisLabel: {
                    formatter: (value: number) => {
                        return value?.toLocaleString('vi', { maximumFractionDigits: 0 });
                    },
                },
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 20,
                    showDetail: true,
                    height: 20,
                },
            ],
            series: series.map(item => ({
                ...item,
                label: {
                    show: true,
                    position: 'top',
                    formatter: (params: any) => {
                        return MoneyUtil.renderMoneyShort(params.value);
                    },
                },
            })),
        } as EChartsOption;
        chartRef.current?.getChartInstance()?.setOption(option, true);
        return <ReactECharts ref={chartRef} wrapperRef={wrapperRef} option={option} style={{ height: 300 }} />;
    };

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

    if (isLoadingData) return <Loading />;

    return (
        <div ref={containerRef} className="mt-2 border p-4">
            <div className="relative flex">
                <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Doanh thu ( VNĐ )</div>
                <ButtonBase
                    tooltip="Xuất hình ảnh"
                    variant="info"
                    className="absolute top-[1px] right-0"
                    startIcon={faDownload}
                    onClick={() => {
                        exportDom('doanh-thu');
                    }}
                />
                <div className="ml-2 w-[40%]">
                    <Select
                        className="w-full"
                        placeholder="Chọn thời gian"
                        options={[
                            {
                                value: 'month',
                                label: 'Tháng',
                            },
                            {
                                value: 'year',
                                label: 'Năm',
                            },
                        ]}
                    />
                </div>
            </div>
            <hr />
            <div className="dashboard-unit flex" ref={containerRef}>
                <div className="w-full sm:w-full h-full flex-col flex justify-center items-center">
                    {renderEChart(dataReportRevenue, chartRef, containerRef)}
                </div>
            </div>
        </div>
    );
};

export default ReportRevenueChart;
