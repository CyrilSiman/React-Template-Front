import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import {withStyles} from '@material-ui/core'
import styles from './styles'

const SelectField = ({readOnly,label,required,fullWidth, input: {name, onChange, value, ...restInput}, meta, classes, items}) => {

    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

    return (
        <FormControl className={classes.formControlMargin} fullWidth={fullWidth} disabled={readOnly} error={showError} >
            <InputLabel htmlFor={`${name}-input`} shrink={true} required={required}>
                {label}
            </InputLabel>
            <Select
                value={value}
                classes={{disabled:classes.disabled,root:classes.input, select:classes.select}}
                onChange={onChange}
                {...restInput}
                inputProps={{
                    name: name,
                    id: `${name}-input`,
                }}
            >
                {
                    items.map(value => <MenuItem key={value[0]} value={value[0]}>{value[1]}</MenuItem>)
                }
            </Select>
            {showError &&
                <FormHelperText error classes={{root:classes.formHelper,disabled:classes.formHelperDisabled}}>{meta.error || meta.submitError}</FormHelperText>
            }
        </FormControl>
    )
}

export default withStyles(styles)(SelectField)