import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

import AnonymousMenu from "./Menus/AnonymousMenu";
import UserMenu from "./Menus/UserMenu";

const useStyles = makeStyles({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    }
});

const AppToolbar = ({ user }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.toolbarTitle}>
                        <Link to="/" className={classes.mainLink}>Chat</Link>
                    </Typography>

                    {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                </Toolbar>
            </AppBar >
            <Toolbar sx={{ mb: 2 }} />
        </>
    );
};
export default AppToolbar;