import grey from '@material-ui/core/colors/grey'

const styles = theme => ({
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
    }
})

/*
inputUnderline : {
        borderBottomStyle : 'solid',
        borderBottomWidth : 1,
        borderBottomColor: grey[500],
    },
 */

export default styles