import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import AppApolloClient from 'ROOT/services/AppApolloClient'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider} from '@material-ui/core'
import {defaultTheme} from 'ROOT/themes'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import frLocale from 'date-fns/locale/fr'
import DateFnsUtils from '@date-io/date-fns'
import {SnackbarProvider} from 'notistack'

import './configI18n'

import { ApolloProvider } from '@apollo/react-hooks'

ReactDOM.render(
    <Suspense fallback="loading">
        <ApolloProvider client={AppApolloClient}>
            <MuiThemeProvider theme={defaultTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                    <CssBaseline/>
                    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                            <App/>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </ApolloProvider>
    </Suspense>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
