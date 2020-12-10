import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TabsHeader from "../components/tabs/TabsHeader";

export default function TabsLayout(props) {
    return (
        <Router>
            <Switch>
                {
                    props.tabs.map((tab) => {
                        return (
                            <Route path={tab.path} key={tab.key}>
                                <TabsHeader tabs={props.tabs}/>
                                {tab.component}
                            </Route>
                        )
                    })
                }
                {
                    props.extraRoutes.map((route) => {
                        return (
                            <Route path={route.path} key={route.key}>
                                {route.component}
                            </Route>
                        );
                    })
                }
            </Switch>
        </Router>
    )
}