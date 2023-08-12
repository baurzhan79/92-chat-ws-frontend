import React, { useState, useRef, useEffect } from "react";

import { Container, Grid, TextField } from "@mui/material";

const ChatWs = ({ user }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [strOnlineUsers, setStrOnlineUsers] = useState("");

    const ws = useRef(null);

    useEffect(() => {
        if (user !== null) {
            ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user.token}&username=${user.username}`);
            ws.current.onclose = () => {
                console.log("ws closed");
            }

            ws.current.onopen = () => {
                ws.current.send(JSON.stringify({
                    type: "GET_ONLINE_USERS"
                }));
            }

            ws.current.onmessage = event => {
                const decodedMessage = JSON.parse(event.data);

                if (decodedMessage.type === "ONLINE_USERS") {
                    setOnlineUsers(JSON.parse(decodedMessage.users));
                }
            };

            return () => {
                if (ws.current.readyState === 1) ws.current.close();
            }
        }
        else setStrOnlineUsers("");
    }, [user]);

    useEffect(() => {
        let strUsers = "";

        onlineUsers.forEach(element => {
            if (strUsers.length > 0) strUsers += "\n";
            strUsers += element;
        });

        setStrOnlineUsers(strUsers);
    }, [onlineUsers]);

    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Online users"
                        multiline
                        rows={15}
                        InputProps={{
                            readOnly: true,
                        }}
                        value={strOnlineUsers}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    sm=8
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatWs