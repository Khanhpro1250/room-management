import { useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/component/Echart/ReactECharts';
import { useMergeState } from '~/hook/useMergeState';

interface IProps {
    data: any;
}
interface IState {
    deActiveButton: Array<string>;
}
const RoomStateChart = (props: IProps) => {
    const chartRef = useRef<ReactEChartsRef>(null);
    const [state, setState] = useMergeState<IState>({
        deActiveButton: [],
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const mockData = [
        {
            id: 'a20757dc-fe3f-47bf-a5a5-bbef522dde95',
            roomCode: '123',
            houseName: 'Nhà 1',
            statusCode: 'NEW',
            statusName: 'Phòng trống',
        },
        {
            id: 'cb2528e9-acfe-4481-b228-f198ddeb4c53',
            roomCode: '123123',
            houseName: 'Khanh Huynh',
            statusCode: 'NEW',
            statusName: 'Phòng trống',
        },
        {
            id: 'f7b929a7-e544-497e-9203-f27d35ee7435',
            roomCode: 'P01',
            houseName: 'Nhà 1',
            statusCode: 'RENT',
            statusName: 'Đang thuê',
        },
    ];

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

        console.log(dataRender);

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

        console.log(dataColorRender);

        return (
            <ReactECharts
                ref={chartRef}
                option={{
                    tooltip: {
                        trigger: 'item',
                        formatter: (params: any) => {
                            console.log('params', params);
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
                    width: '100%',
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
        <div className="mt-2 border p-4">
            <div className="text-2xl text-[#0e335890] font-bold mb-2 ">Trạng thái phòng</div>
            <hr />
            <div className="dashboard-unit flex" ref={containerRef}>
                <div className="w-full sm:w-full h-full flex-col flex justify-center items-center">
                    {renderEChart(mockData)}
                </div>
                <div className="legend-dashboard h-[100px] flex flex-wrap ">{renderLegend(mockData)}</div>
            </div>
        </div>
    );
};

export default RoomStateChart;
