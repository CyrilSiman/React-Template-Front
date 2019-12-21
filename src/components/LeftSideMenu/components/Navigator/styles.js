const styles = theme => ({
    categoryHeader: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: '#dddddd',
        fontSize: '.7rem',
        letterSpacing: '1px',
        fontWeight: '500',
        textTransform : 'uppercase',
        padding: theme.spacing(2)
    },
    item: {
        paddingTop: 1,
        paddingBottom: theme.spacing(1),
        transition: 'all .3s ease-out',
        transitionProperty: 'all',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-out',
        transitionDelay: '0s',
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
            color:'#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    },
    topItemCategory: {
        marginTop : theme.spacing(4),
        paddingBottom: 0,
    },
    mainTitle: {
        justifyContent : 'center',
    },
    itemActiveItem: {
        color: theme.leftMenu.selectedItemColor,
        boxShadow: theme.leftMenu.selectedItemBoxShadow,
        '&::before': {
            content: '"\\A"',
            borderRadius: '50%',
            background: theme.leftMenu.selectedItemCircle,
            position: 'absolute',
            top: 'calc(50% - 3px)',
            right: '11px',
            height: '7px',
            width: '7px',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
        }
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
})

export default styles