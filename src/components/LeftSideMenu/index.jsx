import React, { Fragment } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Hidden from '@material-ui/core/Hidden'
import Navigator from './components/Navigator'

import localState from 'ROOT/services/graphql/localState.graphql'

import styles, { drawerWidth } from './styles'
import { useHistory } from 'react-router-dom'

const LeftSideMenu = (props) => {

    const client = useApolloClient()
    let history = useHistory()

    const { loading, data } = useQuery(localState)

    const { classes, navigation } = props

    const toggleLeftMenu = () => {
        client.writeData({ data: { showLeftMenu: false } })
    }

    const navigateToLink = (path) => {
        toggleLeftMenu()
        history.push(path)
    }

    return (
        <Fragment>
            <div>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant='temporary'
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            navigation={navigation}
                            onClose={toggleLeftMenu}
                            navigateToLink={navigateToLink}
                            open={!loading && data && data.showLeftMenu}
                        />
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="permanent"
                            navigation={navigation}
                            navigateToLink={navigateToLink}
                            open
                        />
                    </Hidden>
                </nav>
                <div className={classes.appContent}>
                    {props.children}
                </div>
            </div>
        </Fragment>
    )
}

LeftSideMenu.propTypes = {
    navigation: PropTypes.array.isRequired
}

export default withStyles(styles, { withTheme: true })(LeftSideMenu)
