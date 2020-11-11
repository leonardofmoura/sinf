import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import SalesPage from './pages/SalesPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <React.StrictMode>
      <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/sales" component={SalesPage} />
            <Route path="/transactions" component={TransactionsPage} />
          </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
