import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'

import PropTypes from 'prop-types'

import Hidden from '@material-ui/core/Hidden'
import Navigator from './components/Navigator'

import { GetShowLeftMenu } from 'ROOT/services/graphql/localState.graphql'

import useStyles, { drawerWidth } from './styles'
import { useHistory } from 'react-router-dom'
import { showLeftMenuVar } from 'ROOT/services/AppApolloClient'

const LeftSideMenu = (props) => {

    const history = useHistory()

    const { loading, data } = useQuery(GetShowLeftMenu)

    const classes = useStyles()
    const { navigation } = props

    const toggleLeftMenu = () => {
        showLeftMenuVar(false)
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
                            variant="temporary"
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
    navigation: PropTypes.array.isRequired,
    children: PropTypes.any,
}

export default LeftSideMenu
