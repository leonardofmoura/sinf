import React from 'react';
import { withRouter } from "react-router-dom";
import SideNav from "./SideNav/SideNav";

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav/>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

