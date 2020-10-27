import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

const Main = () => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={() => console.log('la')}>
                MyApp
            </Link>
            <Link color="inherit" href="/getting-started/installation/" onClick={() => console.log('la')}>
                Main
            </Link>
            <Typography color="textPrimary" style={{ fontSize:13 }}>Page One</Typography>
        </Breadcrumbs>
    )
}

export default Main