import { Message, MessagesListProps } from "@/utils/types";
import { Grid } from "@mui/material";
import React from "react";
import MessageCard from "../MessageCard/MessageCard";

const MessagesList = ({
  allMessages,
  messagesEndRef,
  loggedInUser,
}: MessagesListProps) => {
  return (
    <Grid
      container
      height={`calc(100vh - 138px)`}
      sx={{
        overflowY: "scroll",
        flexWrap: "nowrap",
      }}
      p={2}
      flexDirection="column"
      gap={1}
    >
      {allMessages?.map((message: Message, i: number) => (
        <MessageCard
          key={message?.id}
          loggedInUser={loggedInUser}
          message={message}
          passRef={i === allMessages?.length - 1}
          messagesEndRef={messagesEndRef}
        />
      ))}
    </Grid>
  );
};

export default MessagesList;
