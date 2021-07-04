import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Master from './Master';
import Dashboard from './component/Dashboard';
import Login from './component/auth/Login';
import Administrator from './component/Administrator';
import Polyline from './component/Polyline';
import GisAttr from './component/Gisattr';

function Routemain(){
    return(
        <Router history={browserHistory} >
            <Route path={`${process.env.PUBLIC_URL}/`} component={Login} />
            <Route component={Master}>
                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                <Route path={`${process.env.PUBLIC_URL}/administrator`} component={Administrator} />
                <Route path={`${process.env.PUBLIC_URL}/polyline`} component={Polyline} />
                <Route path={`${process.env.PUBLIC_URL}/gisattr`} component={GisAttr} />
            </Route>
        </Router>
    );
}

export default Routemain