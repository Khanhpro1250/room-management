import '../styles/status.scss';

interface Props {
    status: string;
    statusName: string;
}

export const Status = (props: Props) => {
    const className = {
        New: 'h-[18px] w-fit p-[12px] flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#52505020] text-[#525050]',
        Rented: 'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#248a5220] text-[#248a52]',
        Renting:
            'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#4d74a520] text-[#4d74a5]',
        Deposited:
            'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#a3a74320] text-[#a3a743]',
        DEPOSIT:
            'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#a3a74320] text-[#a3a743]',
        NoHD: 'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#9b5a3720] text-[#9b5a37]',
        EXPIRED:
            'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#9b5a3720] text-[#9b5a37]',
        NotRented:
            'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#e45f5820] text-[#e45f58]',
        Return: 'h-[18px] w-fit p-[12px]  flex justify-center items-center border rounded-[3px] overflow-hidden bg-[#e45f5820] text-[#e45f58]',
    }[props.status];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={className}>{props.statusName}</div>
        </div>
    );
};
