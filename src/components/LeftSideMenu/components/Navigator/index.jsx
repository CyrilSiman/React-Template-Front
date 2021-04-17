import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Route } from 'react-router-dom'

import routes from 'ROOT/routes'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'

import useStyles from './styles'

const Navigator = (props) => {
    const { navigation,navigateToLink, ...other } = props

    const classes = useStyles()

    return (
        <Drawer {...other}>
            <List disablePadding>
                <div className={classes.toolbar} />
                {/* eslint-disable-next-line react/no-children-prop */}
                <Route path={routes.PRIVATE_DASHBOARD} children={({ match }) => (
                    <ListItem
                        button
                        onClick={() => navigateToLink(routes.PRIVATE_DASHBOARD)}
                        className={classNames(classes.item, classes.topItemCategory, match && classes.itemActiveItem)}>
                        <ListItemIcon className={classes.itemIcon}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                                Dashboard
                        </ListItemText>
                    </ListItem>
                )} />
                {navigation.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, path }) => (
                            // eslint-disable-next-line react/no-children-prop
                            <Route key={path} path={path} children={({ match }) => (
                                <ListItem
                                    onClick={() => navigateToLink(path)}
                                    key={path}
                                    button
                                    dense
                                    className={classNames(
                                        classes.item,
                                        match && classes.itemActiveItem
                                    )}
                                >
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            )} />
                        ))}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    )
}

Navigator.propTypes = {
    navigation : PropTypes.array.isRequired,
    navigateToLink : PropTypes.func.isRequired,
}

export default Navigator