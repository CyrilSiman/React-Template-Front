import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import {withStyles} from '@material-ui/core'
import styles from './styles'

const TextField = ({readOnly, rows, label, required, fullWidth, multiline, autoFocus, input: {name, onChange, value, type, ...restInput}, meta, classes}) => {

    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

    return (
        <FormControl className={classes.formControlMargin} fullWidth={fullWidth} disabled={readOnly} error={showError} >
            <InputLabel htmlFor={`${name}-input`} shrink={true} required={required}>
                {label}
            </InputLabel>
            <Input
                classes={{disabled:classes.disabled,root:classes.input}}
                id={`${name}-input`}
                autoFocus={autoFocus}
                autoComplete='off'
                value={value}
                {...restInput}
                onChange={onChange}
                multiline={multiline}
                rows={rows}
                type={type ? type : 'text'}
            />
            {showError &&
                <FormHelperText error classes={{root:classes.formHelper,disabled:classes.formHelperDisabled}}>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default withStyles(styles)(TextField)