import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'
import Layout from '@/pages/Layout/index.jsx'
import Login from '@/pages/Login/index.jsx'
import NotFound from './pages/NotFound'
import PrivateRoute from '@/components/PrivateRoute'

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from='/' to='/home'></Redirect>
                <Route path='/login' component={Login}></Route>
                <PrivateRoute path='/home' component={Layout}></PrivateRoute>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    )
}
