import React from 'react';
import TopBar from "../components/topbar/TopBar/TopBar";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarPageSection from "../components/sidebar/SidebarPageSection/SidebarPageSection";
import SidebarPageContent from '../components/sidebar/SidebarPageContent/SidebarPageContent';

const SidebarLayout = (props) => (
    <React.Fragment>
        <TopBar/>
        <SidebarPageSection>
            <Sidebar/>
            <SidebarPageContent>
                {props.children}
            </SidebarPageContent>
        </SidebarPageSection>
    </React.Fragment>
)

export default SidebarLayout;
