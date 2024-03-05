import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { EChartsOption, SeriesOption } from 'echarts';
import { RefObject, useMemo, useRef, useState } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/component/Echart/ReactECharts';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';

import { Select } from 'antd';
import DomToImage from 'dom-to-image';
import moment from 'moment';
import Loading from '~/component/Elements/loading/Loading';
import { MoneyUtil } from '~/util/MoneyUtil';
import { ComboFilterReportDto } from './constants/dashboard.constant';
import { useReportTotalSpentAmount } from './hooks/useReportTotalSpentAmount';
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

const compareMonths = (a: any, b: any) => {
    if (a.year === b.year) {
        return a.month - b.month;
    } else {
        return a.year - b.year;
    }
};

const getDistinctMonths = (data: any) => {
    const monthsSet = new Set();
    data.forEach((entry: any) => {
        monthsSet.add(JSON.stringify(entry.month));
    });
    return Array.from(monthsSet)
        .map((month: any) => JSON.parse(month))
        .sort(compareMonths);
};
const ReportTotalSpendAmount = (props: IProps) => {
    const chartRef = useRef<ReactEChartsRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [filter, setFilter] = useState({ dateTime: moment().format('YYYY-MM') });

    const { data: dataResponse, isFetching: isLoadingData } = useReportTotalSpentAmount({ ...filter }, undefined);
    const dataReportRevenue = useMemo(() => dataResponse?.data?.result ?? [], [dataResponse]);

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
            // dataZoom: [
            //     {
            //         type: 'slider',
            //         show: true,
            //         start: 0,
            //         end: 20,
            //         showDetail: true,
            //         height: 20,
            //     },
            // ],
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

    const onChangeFilter = (value: any) => {
        setFilter({ dateTime: value });
    };

    return (
        <div ref={containerRef} className="mt-2 border p-4">
            <div className="relative flex">
                <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Tổng chi ( VNĐ )</div>
                <ButtonBase
                    tooltip="Xuất hình ảnh"
                    variant="info"
                    className="absolute top-[1px] right-0"
                    startIcon={faDownload}
                    onClick={() => {
                        exportDom('tong-chi');
                    }}
                />
                <div className="ml-2 w-[40%]">
                    <Select
                        className="w-full"
                        defaultValue={filter.dateTime}
                        onChange={onChangeFilter}
                        placeholder="Chọn thời gian"
                        options={ComboFilterReportDto}
                    />
                </div>
            </div>
            <hr />
            <div className="dashboard-unit flex" ref={containerRef}>
                <div className="w-full sm:w-full h-full flex-col flex justify-center items-center">
                    {isLoadingData ? <Loading /> : renderEChart(dataReportRevenue, chartRef, containerRef)}
                </div>
            </div>
        </div>
    );
};

export default ReportTotalSpendAmount;
