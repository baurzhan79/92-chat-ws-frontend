import React from "react";
import { useDispatch } from "react-redux";

import { Typography, Button } from "@mui/material";

import { logoutUser } from "../../../../store/actions/usersActions";

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            <Typography variant="h7" style={{ marginRight: "10px" }}>
                Welcome, {user.displayName ? user.displayName : user.username}!
            </Typography>
            <Button
                onClick={logout}
                color="inherit"
            >
                Logout
            </Button>
        </>
    );
};

export default UserMenu;