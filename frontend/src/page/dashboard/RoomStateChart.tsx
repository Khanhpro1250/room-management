import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/component/Echart/ReactECharts';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { useMergeState } from '~/hook/useMergeState';
import DomToImage from 'dom-to-image';
import { useReportRoomState } from './hooks/useReportRoomState';
import Loading from '~/component/Elements/loading/Loading';
import { Select } from 'antd';
interface IProps {}
interface IState {
    deActiveButton: Array<string>;
}
const RoomStateChart = (props: IProps) => {
    const chartRef = useRef<ReactEChartsRef>(null);
    const [state, setState] = useMergeState<IState>({
        deActiveButton: [],
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: dataResponse, isFetching: isLoadingDataState } = useReportRoomState();
    const dataRoomState = useMemo(() => dataResponse?.data?.result ?? [], [dataResponse]);

    const onClick = (code: string) => {
        const { deActiveButton } = state;
        const deActiveButtonClone = [...deActiveButton];
        if (deActiveButton.includes(code)) {
            const index = deActiveButton.indexOf(code);
            deActiveButtonClone.splice(index, 1);
        } else {
            deActiveButtonClone.push(code);
        }
        setState({ deActiveButton: [...deActiveButtonClone] });
    };

    const renderEChart = (data: any) => {
        const { deActiveButton } = state;
        const dataFilterActiveButton = data.filter((item: any) => !deActiveButton.includes(item.statusCode));
        const status = data
            .filter((item: any) => !deActiveButton.includes(item.statusCode))
            .filter((item: any, index: number, self: any) => {
                return self.findIndex((m: any) => m.statusCode === item.statusCode) === index;
            })
            ?.map((item: any) => {
                return { code: item.statusCode ?? 'NO_AREA', name: item.statusName ?? 'NoArea' };
            });

        const dataRender: any[] = status?.map((item: any) => {
            return {
                name: item.name,
                disPlayName: item.name,
                value: dataFilterActiveButton.filter((m: any) => m.statusCode === item.code).length,
            };
        });

        const dataColorRender = status?.map((item: any) => {
            switch (item.code) {
                case 'NEW':
                    return '#f7941d';
                case 'RENT':
                    return '#03897b';
                default:
                    return '#d2d1ca';
            }
        });

        if (isLoadingDataState) return <Loading />;

        return (
            <ReactECharts
                ref={chartRef}
                option={{
                    tooltip: {
                        trigger: 'item',
                        formatter: (params: any) => {
                            return `${params.data.disPlayName} Chiếm ${params.percent}% : ${Math.round(
                                params.value ?? 0,
                            ).toLocaleString('vi', { maximumFractionDigits: 0 })}`;
                        },

                        textStyle: {
                            fontFamily: 'lato, helvetica, arial, verdana, sans-serif, "FontAwesome"',
                            color: '#ffff',
                            fontSize: 16,
                        },
                        backgroundColor: 'rgb(64,64,64)',
                        borderWidth: 0,
                        position: 'inside',
                    },
                    series: [
                        {
                            type: 'pie',
                            avoidLabelOverlap: false,
                            label: {
                                show: true,
                                formatter: ['{d}%'].join(' '),
                                position: 'inside',
                                color: '#fff',
                            },

                            emphasis: {},
                            data: dataRender,
                            color: dataColorRender,
                        },
                    ],
                }}
                style={{
                    width: '300px',
                    height: 'unset',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            />
        );
    };

    const renderLegend = (data: any) => {
        const { deActiveButton } = state;
        const status = data
            .filter((item: any, index: number, self: any) => {
                return self.findIndex((m: any) => m.statusCode === item.statusCode) === index;
            })
            ?.map((item: any) => {
                return { code: item.statusCode ?? 'NO_AREA', name: item.statusName ?? 'NoArea' };
            });
        return status?.map((item: any) => {
            return (
                <>
                    <span
                        key={item.code}
                        className={`m-2 cursor-pointer button-legend area-button-${
                            item.code === 'NEW' ? 'hcm' : item.code === 'RENT' ? 'hn' : 'no-area'
                        } ${deActiveButton.includes(item.code) ? 'de-active' : ''}`}
                        onClick={() => onClick(item.code)}
                    >
                        {item.name}
                    </span>
                </>
            );
        });
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
        <div ref={containerRef} className="mt-2 border p-4">
            <div className="relative flex">
                <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Trạng thái phòng</div>
                <ButtonBase
                    tooltip="Xuất hình ảnh"
                    variant="info"
                    className="absolute top-[3px] right-0"
                    startIcon={faDownload}
                    onClick={() => {
                        exportDom('trang-thai-phong');
                    }}
                />
                <div className="ml-2 w-[40%]">
                    <Select
                        className="w-full test-class"
                        placeholder="Chọn tháng"
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
            <div className="dashboard-unit flex">
                <div className="w-full sm:w-full h-full flex-col flex justify-center items-center">
                    {renderEChart(dataRoomState)}
                </div>
                <div className="legend-dashboard h-[100px] flex flex-wrap ">{renderLegend(dataRoomState)}</div>
            </div>
        </div>
    );
};

export default RoomStateChart;
