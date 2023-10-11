import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { AppContainer } from '~/component/Layout/AppContainer';
import CustomerForm from './components/CustomerForm';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { faArrowRotateBack, faClose, faSave } from '@fortawesome/free-solid-svg-icons';

const CustomerPage: React.FC = () => {
    return (
        <AppContainer className="body-page h-full overflow-auto">
            <Tabs type="card"
                tabBarExtraContent={{
                    right: (
                        <div className="flex-1 flex items-center justify-end mb-2">
                            <ButtonBase
                                title="Trở về"
                                size="md"
                                startIcon={faArrowRotateBack}
                                variant="danger"
                            // onClick={props.onClose}
                            />
                            <ButtonBase
                                title="Lưu"
                                size="md"
                                startIcon={faSave}
                            //  onClick={onSubmit}
                            />
                        </div>
                    ),
                }}
            >
                <TabPane tab="Thông tin khách thuê" key="1">
                    <CustomerForm />
                </TabPane>
                <TabPane tab="Dịch vụ" key="2">
                    <>123123</>
                </TabPane>
                <TabPane tab="Thành viên" key="3">
                    <>123123</>
                </TabPane>
                <TabPane tab="Hợp đồng" key="4">
                    <>123123</>
                </TabPane>
            </Tabs>
        </AppContainer>
    );
};
export default CustomerPage;
