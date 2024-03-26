import { Conversation, LoggedInUser, Message } from "@/utils/types";
import React from "react";
import ChatListItem from "./ChatListItem";

const ChatListItems = ({
  conversations,
  loggedInUser,
  currentConversation,
  newMessagesInConversations,
}: {
  conversations: Conversation[];
  loggedInUser: LoggedInUser;
  currentConversation: Conversation | null;
  newMessagesInConversations: Message[];
}) => {
  return conversations?.map((conversation: Conversation) => {
    return (
      <ChatListItem
        key={conversation?.id}
        conversation={conversation}
        currentConversation={currentConversation}
        loggedInUser={loggedInUser}
        newMessagesInConversations={newMessagesInConversations}
      />
    );
  });
};

export default ChatListItems;
