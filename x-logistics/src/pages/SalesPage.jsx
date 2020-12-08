import CompleteSales from "../components/sales/CompleteSales";
import PendingPackaging from "../components/sales/PendingPackaging";
import PendingPicking from "../components/sales/PendingPicking";
import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";
import { setAutoToken } from "../jasmin/token";

export default function SalesPage() {
    setAutoToken();

    const tabs = [
        {
            path: '/sales/pending_picking',
            title: 'Pending Picking',
            component: <PendingPicking />,
            key: 1
        },
        {
            path: '/sales/pending_packaging',
            title: 'Pending Packaging',
            component: <PendingPackaging />,
            key: 2
        },
        {
            path: '/sales/complete',
            title: 'Complete',
            component: <CompleteSales />,
            key: 3
        }, 
    ]

    return (
        <SidebarLayout>
            <TabsLayout tabs={tabs} />
        </SidebarLayout>
    )
}