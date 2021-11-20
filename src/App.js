import { lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'
import NotFound from './pages/NotFound'
import PrivateRoute from '@/components/PrivateRoute'
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))

export default function App() {
    return (
        <Router history={history}>
            <Suspense fallback={<div>loading...</div>}>
                <Switch>
                    <Redirect exact from='/' to='/home'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <PrivateRoute
                        path='/home'
                        component={Layout}
                    ></PrivateRoute>
                    <Route component={NotFound}></Route>
                </Switch>
            </Suspense>
        </Router>
    )
}
