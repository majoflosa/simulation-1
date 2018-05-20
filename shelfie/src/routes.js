import React from 'react';
import {Switch, Route} from 'react-router-dom';

import App from './App';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';

export default (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/new-product/" component={Form} />
        <Route path="/edit-product/:id" component={Form} />
    </Switch>
);