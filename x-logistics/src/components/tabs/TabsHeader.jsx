import React  from 'react';
import { withRouter } from "react-router-dom";
import TabsHeaderNav from './TabsHeaderNav/TabsHeaderNav.jsx';

export default class TabsHeader extends React.Component {
    render() {
        return (
            <RouterTabsHeader tabs={this.props.tabs}/>
        );
    }
}

const RouterTabsHeader = withRouter(TabsHeaderNav);



