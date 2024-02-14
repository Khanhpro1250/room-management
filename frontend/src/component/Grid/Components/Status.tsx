import '../styles/status.scss';

interface Props {
    status: string;
    statusName: string;
}

export const Status = (props: Props) => {
    const className = {
        NEW: 'w-full h-[30px] flex justify-center items-center border rounded-md overflow-hidden contrast-100 text-orange-600 border-orange-600',
        RENTED: 'w-full h-[30px] flex justify-center items-center border rounded-md overflow-hidden contrast-100 text-green-600 border-green-600 ',
    }[props.status];

    return (
        <div className="pt-2">
            <div className={className}>{props.statusName}</div>
        </div>
    );
};
