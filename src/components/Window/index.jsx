import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import { useTranslation } from 'react-i18next'

const Window = (props) => {
    const { t } = useTranslation('global')
    let { classes } = props

    return (
        <main className={classes.wrapperPage}>
            <Paper className={classes.paper} elevation={10}>
                <Typography component='h1' variant='h5'>
                    <a href='/' className='logo logo-admin'>
                        <img src='/img/logoApp.svg' height='60' alt='logo' />
                    </a>
                </Typography>
                <Typography component='h1' variant='h6'>
                    {t('appName')}
                </Typography>
                {props.children}
            </Paper>
        </main>)

}

export default withStyles(styles)(Window)