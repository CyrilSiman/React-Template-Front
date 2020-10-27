import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControlMargin : {
        marginTop : theme.spacing(1),
    },
    input :{
        '&$disabled': {
            color: theme.palette.text.primary,
            cursor: 'default',
        },
        '&$disabled:before': {
            borderBottomStyle : 'none',
            borderBottomWidth : 1,
            borderBottomColor: grey[200],
        },
    },
    disabled: {},
    formHelper:{
        fontStyle : 'italic',
    },
    formHelperDisabled: {
        marginTop : 0,
        marginBottom : 8,
    },
}))

export default useStyles