import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Paper, Popover, Typography } from "@mui/material";
import * as React from "react";

interface ChatLogsProps {
  sender: string;
  message: string;
  isSender: boolean;
  time: string;
}

export const ChatMessage = ({ msg, time }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        style={{
          marginLeft: 40,
          marginRight: 20,
          padding: 9,
          maxWidth: "fit-content",
          wordWrap: "break-word",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Typography style={{ fontFamily: "Montserrat" }}>
          {msg}
        </Typography>
      </Paper>
      <Typography
        variant="caption"
        style={{ marginLeft: 40, marginRight: 20, fontFamily: "Montserrat" }}
      >
        {time}
      </Typography>
    </div>
  );
};

export const ChatSenderMessage = ({ msg, time }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Paper
        style={{
          marginRight: 40,
          padding: 9,
          maxWidth: "fit-content",
          wordWrap: "break-word",
          textAlign: "right",
          backgroundColor: "#5995de",
        }}
      >
        <Typography style={{ color: "white", fontFamily: "Montserrat" }}>
          {msg}
        </Typography>
      </Paper>
      <Typography variant="caption" style={{ marginRight: 40 , fontFamily: "Montserrat"}}>
        {time}
      </Typography>
    </div>
  );
};

const ChatLogs: React.FC<ChatLogsProps> = ({
  sender,
  message,
  isSender,
  time,
}) => {
  if (!isSender) {
    return (
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <IconButton>
          <AccountCircle />
        </IconButton>
        {sender} 
        <ChatMessage msg={message} time={time} />
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", maxWidth: "100%", textAlign: "right" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            You
            <IconButton>
              <AccountCircle />
            </IconButton>
            <ChatSenderMessage msg={message} time={time} />
          </div>
        </div>
      </div>
    );
  }
};

export default ChatLogs;
