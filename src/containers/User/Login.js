import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Avatar, Button, CssBaseline, Grid, Typography, Container, Alert, Link, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";

import { loginUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: "#9c27b0" //palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    alert: {
        width: "100%"
    }
});

const Login = ({ isAllowed }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const loginError = useSelector(state => state.users.loginError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAllowed) navigate("/");
    }, [isAllowed, navigate])

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const submitFormHandler = async event => {
        event.preventDefault();
        await dispatch(loginUser({ ...state }));
    };

    const getFieldError = fieldName => {
        try {
            return loginError.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box mt={5} className={classes.paper}>
                <Box m={1}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {
                    loginError && <Alert
                        severity="error"
                        className={classes.alert}
                        style={{ marginTop: "20px" }}
                    >
                        {loginError.error}
                    </Alert>
                }
                <Box mt={3}>
                    <form className={classes.form} noValidate onSubmit={submitFormHandler}>
                        <Grid container spacing={2}>
                            <FormElement
                                error={getFieldError("username")}
                                name="username"
                                label="Enter username or email"
                                required={true}
                                // value={state.username}
                                onChange={inputChangeHandler}
                            />

                            <FormElement
                                error={getFieldError("password")}
                                name="password"
                                label="Password"
                                type="password"
                                required={true}
                                // value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Box my={3} mx={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2" component={RouterLink}>
                                    Or sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;