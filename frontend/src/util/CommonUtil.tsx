import Loading from '~/component/Elements/loading/Loading';
import { ModalRef } from '~/component/Modal/ModalBase';

export default class CommonUtil {
    static mask = (modalRef: React.RefObject<ModalRef>) => {
        modalRef.current?.onOpen(<Loading />, '');
    };
    static unMask = (modalRef: React.RefObject<ModalRef>) => {
        modalRef.current?.onClose();
    };
}
