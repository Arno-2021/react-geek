import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import Layout from './pages/Layout/index.jsx'
import Login from './pages/Login/index.jsx'
import NotFound from './pages/NotFound'
export default function App() {
    return (
        <Router>
            <Switch>
                <Redirect exact from='/' to='/home'></Redirect>
                <Route path='/home' component={Layout}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    )
}
