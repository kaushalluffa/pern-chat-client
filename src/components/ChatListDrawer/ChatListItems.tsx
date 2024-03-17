import { Conversation, LoggedInUser } from "@/utils/types";
import React from "react";
import ChatListItem from "../ChatListItem/ChatListItem";

const ChatListItems = ({
  conversations,
  loggedInUser,
  currentConversation,
}: {
  conversations: Conversation[];
  loggedInUser: LoggedInUser;
  currentConversation: Conversation | null;
}) => {
  return conversations?.map((conversation: Conversation) => {
    return (
      <ChatListItem
        key={conversation?.id}
        conversation={conversation}
        currentConversation={currentConversation}
        loggedInUser={loggedInUser}
      />
    );
  });
};

export default ChatListItems;
