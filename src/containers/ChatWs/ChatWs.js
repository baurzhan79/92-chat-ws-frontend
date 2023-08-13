import React, { useState, useRef, useEffect } from "react";

import { Container, Grid, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    flexRowCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const ChatWs = ({ user }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    const ws = useRef(null);

    useEffect(() => {
        if (user !== null) {
            ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user.token}&username=${user.username}`);
            ws.current.onclose = () => {
                console.log("ws closed");
                setLoggedIn(false);
            }

            ws.current.onopen = () => {
                ws.current.send(JSON.stringify({
                    type: "GET_ONLINE_USERS"
                }));
                setLoggedIn(true);
            }

            ws.current.onmessage = event => {
                const decodedMessage = JSON.parse(event.data);

                if (decodedMessage.type === "ONLINE_USERS") {
                    setOnlineUsers(JSON.parse(decodedMessage.users));
                }

                if (decodedMessage.type === "NEW_MESSAGE") {
                    setMessages((messages) => [...messages, decodedMessage.message]);
                }
            };

            return () => {
                if (ws.current.readyState === 1) ws.current.close();
            }
        }
    }, [user]);

    useEffect(() => {
        if (!isLoggedIn) {
            setOnlineUsers([]);
            setMessages([]);
            setMessageText("");
        }
    }, [isLoggedIn]);

    const changeMessage = e => {
        setMessageText(e.target.value);
    };

    const sendMessage = () => {
        ws.current.send(JSON.stringify({
            type: "CREATE_MESSAGE",
            username: user.username,
            text: messageText
        }));

        setMessageText("");
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box
                        component="fieldset"
                        sx={{
                            height: 380,
                            overflowY: "scroll",
                            border: '1px solid lightgray'
                        }}
                    >
                        <legend>Online users</legend>
                        <ul style={{ padding: "0", margin: "0" }}>{
                            onlineUsers.map(username =>
                                <li style={{ listStyle: "none" }} key={username}>{username}</li>
                            )
                        }</ul>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box
                        component="fieldset"
                        sx={{
                            height: 290,
                            overflowY: "scroll",
                            border: '1px solid lightgray'
                        }}
                    >
                        <legend>Chat room</legend>
                        {
                            messages.map((message, index) =>
                                <p key={index} style={{ margin: "0" }}><b>{message.username}: </b>{message.text}</p>
                            )
                        }
                    </Box>

                    {/* <Box
                        sx={{
                            height: 290,
                            border: '1px solid lightgray',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >
                    </Box> */}
                    {/* <TextField
                        label="Chat room"
                        fullWidth
                        multiline
                        rows={11}
                        InputProps={{
                            readOnly: true,
                        }}
                    // value={strOnlineUsers}
                    /> */}
                    <Grid container spacing={2} className={classes.flexRowCenter} sx={{ my: 1 }}>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                label="Enter message"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: !isLoggedIn
                                }}
                                value={messageText}
                                onChange={changeMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                variant="outlined"
                                disabled={!isLoggedIn}
                                onClick={sendMessage}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default ChatWs