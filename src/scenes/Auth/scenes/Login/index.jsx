import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import formatDistance from 'date-fns/formatDistance'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from 'ROOT/components/InputForm/TextField'
import Button from '@material-ui/core/Button/Button'
import { LockQuestion } from 'mdi-material-ui'

import WindowForm from 'ROOT/components/Window'

import routes from 'ROOT/routes'
import useStyles from './styles'
import { loginQuery, meQuery } from 'ROOT/services/graphql/auth.graphql'
import { isLoggedInVar } from 'ROOT/services/AppApolloClient'

const LoginScene = () => {

    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation('auth')

    const { loading:loadingMeQuery } = useQuery(meQuery,{
        onCompleted : () => {
            isLoggedInVar(true)
            if(history.location.state && history.location.state.from) {
                history.location.state.from
            }
            history.push(routes.PRIVATE_DASHBOARD)
        },
    })

    const [loginMutation, { loading: mutationLoading, data:dataLogin, error : errorMutation }] = useMutation(loginQuery, {
        onCompleted: (data) => {
            if(data.login && data.login.authenticated) {
                isLoggedInVar(true)
                history.push(routes.PRIVATE_DASHBOARD)
            }
        },
    })

    if(loadingMeQuery) {
        return <div></div>
    }

    const submit = (values) => {
        loginMutation({ variables: { email: values.email, password: values.password } })
    }

    let message = null
    if(dataLogin) {
        if(dataLogin.login.tryLeft) {
            message = <Typography style={{ margin:20 }} color={'error'}>{t('tryLeftBeforeBlock',{ count:dataLogin.login.tryLeft })}</Typography>
        }
        if(dataLogin.login.retryAfter) {
            const value = formatDistance(0, dataLogin.login.retryAfter * 1000, { includeSeconds: true })
            message = <Typography style={{ margin:20 }} color={'error'}>{t('blockDuration',{ duration:value })}</Typography>
        }
    }

    return <WindowForm>
        {message}
        <Form onSubmit={(values) => submit(values)}
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                return errors
            }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                    {errorMutation && <Typography variant="subtitle2" color="error" align={'center'}>{t('authenticationFailed')}</Typography>}
                    <Field name="email" component={TextField} type="text" className=""
                        label={t('field.email')} autoComplete="email" fullWidth />
                    <Field name="password" component={TextField} type="password"
                        className="" label={t('field.password')} autoComplete="off" fullWidth />
                    {mutationLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}
                          disabled >
                          <CircularProgress size={22} />
                      </Button>
                    }
                    {!mutationLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit"
                          className={classes.submit}>{t('button.login')}</Button>
                    }
                    <Button size="small" className={classes.lostPassword} component={Link} to="/lostPassword">
                        <LockQuestion className={classes.leftIcon} />
                        {t('lostPassword')}
                    </Button>
                </form>
            )} />
    </WindowForm>
}

export default LoginScene
