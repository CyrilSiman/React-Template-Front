import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import useStyles from './styles'
import { useTranslation } from 'react-i18next'

const Window = (props) => {
    const { t } = useTranslation('global')
    const classes = useStyles()

    return (
        <main className={classes.wrapperPage}>
            <Paper className={classes.paper} elevation={10}>
                <Typography component="h1" variant="h5">
                    <a href="/" className="logo logo-admin">
                        <img src="/img/logoApp.svg" height="60" alt="logo" />
                    </a>
                </Typography>
                <Typography component="h1" variant="h6">
                    {t('appName')}
                </Typography>
                {props.children}
            </Paper>
        </main>)

}

Window.propTypes = {
    children : PropTypes.any,
}

export default Window