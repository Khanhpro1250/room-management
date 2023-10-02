import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { AppContainer } from '~/component/Layout/AppContainer';
import CustomerForm from './components/CustomerForm';

const CustomerPage: React.FC = () => {
    return (
        <AppContainer className="body-page h-full overflow-auto">
            <Tabs type="card">
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
