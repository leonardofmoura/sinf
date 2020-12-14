import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import './App.css';

import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import SalesPage from './pages/SalesPage';
import TransactionsPage from './pages/TransactionsPage';
import IndexPage from './pages/IndexPage';
import DeliveryNote from "./components/sales/DeliveryNote/DeliveryNote";
require("bootstrap/dist/css/bootstrap.css")
require("bootstrap-icons/font/bootstrap-icons.css")

function App() {
  return (
    <CookiesProvider>
      <Router>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/sales" component={SalesPage} />
            <Route path="/transactions" component={TransactionsPage} />
          </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
