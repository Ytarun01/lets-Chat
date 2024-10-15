import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  receiveMessage,
  markMessageAsSeen,
  sendPresetMessages,
} from "../redux/chatSlice";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(sendPresetMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(message));
      setMessage("");

      setTimeout(() => {
        dispatch(markMessageAsSeen());
      }, 2000);

      setTimeout(() => {
        dispatch(receiveMessage("Hello! This is a reply from User 2."));
      }, 5000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", md: "800px" },
        margin: "0 auto",
        padding: { xs: "20px", md: "30px" },
        border: "1px solid #ccc",
        borderRadius: "12px",
        backgroundColor: "#e0f7fa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        minHeight: "500px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: "10px", color: "#00796b" }}
      >
        Lets Chat
      </Typography>

      <List
        sx={{
          maxHeight: "350px",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            sx={{
              display: "flex",
              justifyContent: msg.user === "User 1" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                backgroundColor: msg.user === "User 1" ? "#b2dfdb" : "#b3e5fc",
                borderRadius: "8px",
                padding: "8px",
                margin: "5px 0",
                maxWidth: "75%",
                position: "relative",
              }}
            >
              <ListItemText
                primary={msg.text}
                secondary={`${msg.user} - ${new Date(
                  msg.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              />
              {msg.user === "User 1" && msg.seen && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "blue",
                    position: "absolute",
                    bottom: "4px",
                    right: "8px",
                    top: "2px",
                  }}
                >
                  ✓ Seen
                </Typography>
              )}
            </Box>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <TextField
        fullWidth
        label="Type a message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        sx={{ margin: "15px 0", borderColor: "#00796b" }}
      />

      <Button
        variant="contained"
        onClick={handleSendMessage}
        sx={{
          backgroundColor: "#00796b",
          color: "#fff",
          "&:hover": { backgroundColor: "#004d40" },
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default Chat;
