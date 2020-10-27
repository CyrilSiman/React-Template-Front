import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import SnackBarContent from './components/SnackBarContent'

class SnackbarCustom extends React.Component {

    state = {
        open: true,
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false })
    }

    render() {
        const { message, variant } = this.props

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={4000}
                onClose={this.handleClose}
            >
                <SnackBarContent
                    onClose={this.handleClose}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        )
    }
}

SnackbarCustom.propTypes = {
    message: PropTypes.node,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

export default SnackbarCustom