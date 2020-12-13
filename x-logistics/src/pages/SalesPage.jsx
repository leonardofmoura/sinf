import CompleteSales from "../components/sales/CompleteSales";
import PendingPackaging from "../components/sales/PendingPackaging";
import PendingPicking from "../components/sales/PendingPicking";
import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
import PickingWave from "../components/sales/PickingWave";
import DeliveryNote from "../components/sales/DeliveryNote/DeliveryNote";

export default function SalesPage() {

    const tabs = [
        {
            path: '/sales/pending_picking',
            title: 'Pending Picking',
            component: <PendingPicking />,
            key: 1
        },
        {
            path: '/sales/picking_waves',
            title: 'Picking Waves',
            component: <PickingWave />,
            key: 2
        }, 
        {
            path: '/sales/pending_packaging',
            title: 'Pending Packaging',
            component: <PendingPackaging />,
            key: 3
        },
        {
            path: '/sales/complete',
            title: 'Complete',
            component: <CompleteSales />,
            key: 4
        }, 
    ]

    const extraRoutes = [
        {
            path:'/delivery_note/:id',
            component: <DeliveryNote />,
            key: 5,
        }
    ]

    return (
        <SidebarLayout>
            <TabsLayout tabs={tabs} extraRoutes={extraRoutes}/>
        </SidebarLayout>
    )
}