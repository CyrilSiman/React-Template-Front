import React from 'react'
import { useMutation } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'

import Button from '@material-ui/core/Button/Button'

import TextField from 'ROOT/components/InputForm/TextField'
import WindowForm from 'ROOT/components/Window'

import ArrowBack from 'mdi-material-ui/ArrowLeft'

import { sendResetPasswordLink } from 'ROOT/services/graphql/auth.graphql'
import useStyles from './styles'

const LostPasswordScene = () => {

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation('auth')

    const [resetPasswordMutation, { loading: resetPasswordLoading }] = useMutation(sendResetPasswordLink, {
        onCompleted:() => {
            enqueueSnackbar(t('passwordReset'),{ variant:'warning' })
        },
        onError:() => {
            //We announced reset password in all case, even if user isn't recognized
            enqueueSnackbar(t('passwordReset'),{ variant:'warning' })
        },
    })

    const submit = (values) => {
        resetPasswordMutation({ variables: { login: values.email } })
    }

    return (<WindowForm >
        <Form onSubmit={(values) => submit(values)}
            initialValues={{ email: '', password: '' }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                    <Field name="email" component={TextField} type="text" fullWidth
                        label="Email" autoComplete="email" />
                    {resetPasswordLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit" className={classes.submit}
                          disabled>
                          <i className="fa fa-refresh fa-spin" />
                      </Button>
                    }
                    {!resetPasswordLoading &&
                      <Button fullWidth variant="contained" color="primary" type="submit"
                          className={classes.submit}>Reset password</Button>
                    }
                    <Button size="small" className={classes.back} component={Link} to="/" >
                        <ArrowBack className={classes.leftIcon} />
                        {t('button.back')}
                    </Button>
                </form>
            )} />
    </WindowForm>)

}

export default LostPasswordScene
