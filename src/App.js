import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import routes from 'ROOT/routes'
import AuthenticatedRouter from 'ROOT/AuthenticatedRouter'
import LoginScene from 'ROOT/scenes/Auth/scenes/Login'
import LostPasswordScene from 'ROOT/scenes/Auth/scenes/LostPassword'

import { GetIsLoggedIn } from 'ROOT/services/graphql/localState.graphql'

const NoMatch = ({ ...rest }) => {

    const { data } = useQuery(GetIsLoggedIn)

    return (
        <Route
            {...rest}
            render={param => {
                return (data && data.isLoggedIn ? (
                    <Redirect to={{ pathname: routes.PRIVATE_DASHBOARD, state: { from: param.location } }} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: param.location } }} />
                ))
            }
            }
        />
    )
}


const App = () => {
    return (
        <Router>
            <Switch>
                <Route component={LoginScene} path={routes.LOGIN} />
                <Route component={LostPasswordScene} path={routes.LOST_PASSWORD} />
                <PrivateRoute component={AuthenticatedRouter} path={routes.PRIVATE_DEFAULT}  />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}



const PrivateRoute = ({ component: Component, ...rest }) => {
    const { data } = useQuery(GetIsLoggedIn)

    return (
        <Route
            {...rest}
            render={params =>
                data && data.isLoggedIn ? (
                    <Component {...params} />
                ) : (
                    <Redirect to={{ pathname: routes.LOGIN, state: { from: params.location.pathname } }} />
                )
            }
        />
    )
}

PrivateRoute.propTypes = {
    component:PropTypes.any.isRequired,
}

export default App
