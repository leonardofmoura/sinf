import SidebarLayout from "../layouts/SidebarLayout";
import OrdersLayout from '../layouts/OrdersLayout';
import { setAutoToken } from "../jasmin/token";

const OrdersPage = () => {
    setAutoToken();
    return (
        <SidebarLayout>
            <OrdersLayout/>
        </SidebarLayout>
    );
};

export default OrdersPage;