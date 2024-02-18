import { EChartsOption, SeriesOption } from 'echarts';
import { it } from 'node:test';
import { RefObject, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/component/Echart/ReactECharts';
import { useMergeState } from '~/hook/useMergeState';

interface IProps {
    data: any;
}
interface IState {
    deActiveButton: Array<string>;
}
const ReportRevenueChart = (props: IProps) => {
    const chartRef = useRef<ReactEChartsRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
                    houseName: 'Nhà 1',
                    month: 2,
                    year: 2024,
                    revenue: 10100,
                },
                {
                    houseId: 'd77cc5ff-d4bd-47be-82ee-6dcf67ef0ea2',
                    houseName: 'Nhà 1',
                    month: 2,
                    year: 2024,
                    revenue: 10100,
                },
            ],
        },
    ];

    const renderEChart = (data: any[], chartRef: RefObject<ReactEChartsRef>, wrapperRef: RefObject<HTMLDivElement>) => {
        const NO_INDEX = -1;
        const DEFAULT_VALUES = 0;
        const houses = data
            .filter((item, index, self) => {
                return self.findIndex(m => m.houseId === item.houseId) === index;
            })
            ?.map(items => {
                return { code: items.houseId, name: items.houseName };
            });

        const dataXAxis: Array<string> = houses?.map(items => {
            return items.name;
        });

        const monthData = data.map(obj => {
            return obj.details.map((detail: any) => {
                return { month: detail.month, year: detail.year };
            });
        });

        const month = []
            .concat(...monthData)
            .filter(
                (itemMonth: any, index, self) =>
                    index === self.findIndex((m: any) => m.month === itemMonth.month && m.year === itemMonth.year),
            ) as any[];

        const series: SeriesOption[] = [];

        houses.forEach(houseItem => {
            const dataHouse: number[] = [];
            const itemSeries: SeriesOption = {
                name: houseItem.name,
                type: 'bar',
                data: [1000, 1000, 100, 1233],
            };
            // month?.forEach(items => {
            //     const indexHouse = data.findIndex((dataItem: any) => {
            //         return dataItem.houseId === houseItem.code;
            //     });
            //     const index = data[indexHouse]?.details?.findIndex(
            //         (item: any) => item.month === items.month && item.year === items.year,
            //     );
            //     const value = indexHouse > NO_INDEX ? data[indexHouse]?.details[index]?.revenue : DEFAULT_VALUES;
            //     dataHouse.push(value);
            // });
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
            },
            xAxis: {
                data: dataXAxis,
            },
            yAxis: {
                axisLabel: {
                    formatter: (value: number) => {
                        return value?.toLocaleString('vi', { maximumFractionDigits: 0 });
                    },
                },
            },
            series: series,
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

    return (
        <div className="mt-2 border p-4">
            <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Doanh thu ( VNĐ )</div>
            <hr />
            <div className="dashboard-unit flex" ref={containerRef}>
                <div className="w-full sm:w-full h-full flex-col flex justify-center items-center">
                    {renderEChart(mockData, chartRef, containerRef)}
                </div>
            </div>
        </div>
    );
};

export default ReportRevenueChart;
