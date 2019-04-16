import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Counter from './routes/Counter';
import UserList from './routes/UserList';
import Context from './routes/Context';

ReactDOM.render(
    <HashRouter>
        <ul>
            <li>
                <Link to="/">首页</Link> 
            </li>
            <li>
                <Link to="/counter">counter</Link> 
            </li>
            <li>
                <Link to="/userlist">userlist</Link> 
            </li>
            <li>
                <Link to="/context">context</Link> 
            </li>
        </ul>
        <Switch >
            <Route exact path="/" component = { Counter }/>
            <Route exact path="/counter" component = { Counter }/>
            <Route exact path="/userlist" component = { UserList }/>
            <Route exact path="/Context" component = { Context }/>
        </Switch>
    </HashRouter>,
    document.querySelector('#app')
);