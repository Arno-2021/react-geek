import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { isAut } from '@/utils/token'
export default function PrivateRoute({
    component: Component,
    children,
    ...rest
}) {
    const location = useLocation()
    return (
        <Route
            {...rest}
            render={() => {
                if (isAut()) {
                    return children ? children : <Component></Component>
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: location.pathname,
                                },
                            }}
                        ></Redirect>
                    )
                }
            }}
        ></Route>
    )
}
