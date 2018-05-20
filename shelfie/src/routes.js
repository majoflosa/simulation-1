import React from 'react';
import {Switch, Route} from 'react-router-dom';

import App from './App';
import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form';

export default (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/form" component={Form} />
        {/* <Route path="/product/" component={Form} /> */}
    </Switch>
);