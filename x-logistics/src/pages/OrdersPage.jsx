import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
//import OrdersLayout from '../layouts/OrdersLayout';
import PendingReception from '../components/orders/PendingReception/PendingReception';
import { setAutoToken } from "../jasmin/token";

const OrdersPage = () => {
    setAutoToken();

    const tabs = [
        {
            path: '/orders/pending_reception',
            title: 'Pending Reception',
            component: <PendingReception/>,
            key: 1,
        },
    ]
    /*
    return (
        <SidebarLayout>
            <OrdersLayout/>
        </SidebarLayout>
    );
    */
   return (
       <SidebarLayout>
           <TabsLayout tabs={tabs}/>
       </SidebarLayout>
   )
};

export default OrdersPage;