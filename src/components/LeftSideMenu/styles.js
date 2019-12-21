
export const drawerWidth = 256

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appContent: {
        flex: 1,
        margin : theme.spacing(3),
        backgroundColor : theme.mainBackgroundColor,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('lg')]: {
            marginLeft: drawerWidth + theme.spacing(3),
        },
    },
})

export default styles