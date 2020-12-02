import PendingPicking from "../components/sales/PendingPicking";
import SidebarLayout from "../layouts/SidebarLayout";
import TabsLayout from "../layouts/TabsLayout";

export default function SalesPage() {

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
            key: 2
        },
        {
            path: '/sales/complete',
            title: 'Complete',
            key: 3
        },
    ]

    return (
        <SidebarLayout>
            <TabsLayout tabs={tabs} />
        </SidebarLayout>
    )
}