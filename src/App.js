import React from 'react'
import { useQuery } from '@apollo/client'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import routes from 'ROOT/routes'
import AuthenticatedRouter from 'ROOT/AuthenticatedRouter'
import LoginScene from 'ROOT/scenes/Auth/scenes/Login'
import LostPasswordScene from 'ROOT/scenes/Auth/scenes/LostPassword'

import localstate from 'ROOT/services/graphql/localState.graphql'

function App () {
    return (
        <Router>
            <Switch>
                <Route component={LoginScene} path={routes.LOGIN} />
                <Route component={LostPasswordScene} path={routes.LOST_PASSWORD} />
                <PrivateRoute component={AuthenticatedRouter} path={routes.PRIVATE_DEFAULT} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}

function NoMatch ({ ...rest }) {

    const { data } = useQuery(localstate)

    return (
        <Route
            {...rest}
            render={props => {
                return (data && data.isLoggedIn ? (
                    <Redirect to={{ pathname: routes.PRIVATE_DASHBOARD, state: { from: props.location } }} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
                ))
            }
            }
        />
    )
}

function PrivateRoute ({ component: Component, ...rest }) {
    const { data } = useQuery(localstate)

    return (
        <Route
            {...rest}
            render={props =>
                data && data.isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location.pathname } }} />
                )
            }
        />
    )
}

export default App
