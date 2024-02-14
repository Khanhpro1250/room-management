import { ICellRendererParams } from 'ag-grid-community';
import { ReactComponent as SpiralLoading } from '~/assets/layout/spiral.svg';

const GridLoading = (props: ICellRendererParams & { loadingMessage: string }) => {
    return (
        <div className="ag-overlay-loading-center">
            <SpiralLoading />
            <span>{props.loadingMessage}</span>
        </div>
    );
};

export default GridLoading;
