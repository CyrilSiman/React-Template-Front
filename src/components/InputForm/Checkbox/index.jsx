import React from 'react'
import {withStyles} from '@material-ui/core'
import styles from './styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const TextField = ({readOnly, label, labelPlacement = 'start', input: {name, checked, onChange, ...restInput}, meta, classes}) => {

    return (
        <FormControlLabel
            className={classes.checkboxControlLabel}
            labelPlacement={labelPlacement}
            control={
                <Checkbox
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                    disabled={readOnly}
                    {...restInput}
                />
            }
            label={label}
        />
    )
}

export default withStyles(styles)(TextField)