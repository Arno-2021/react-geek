import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'
import Layout from '@/pages/Layout/index.jsx'
import Login from '@/pages/Login/index.jsx'
import NotFound from './pages/NotFound'
export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from='/' to='/home'></Redirect>
                <Route path='/home' component={Layout}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    )
}
