import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
import PendingReception from '../components/orders/PendingReception/PendingReception';
import PendingStorage from '../components/orders/PendingStorage/PendingStorage';
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

const OrdersPage = () => {
    const [cookies, ] = useCookies(['loginState']);

    const tabs = [
        {
            path: '/orders/pending_reception',
            title: 'Pending Reception',
            component: <PendingReception/>,
            key: 1,
        },
        {
            path:'/orders/pending_storage',
            title:'Pending Storage',
            component: <PendingStorage/>,
            key: 2,
        }
    ]

    if (cookies.loginState) {
        return (
			<SidebarLayout>
                <TabsLayout tabs={tabs}/>
            </SidebarLayout>
		)
    } else {
        return <Redirect to="/login" />;
    }
};

export default OrdersPage;