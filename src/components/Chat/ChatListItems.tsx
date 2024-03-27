import { Conversation, LoggedInUser, Message } from "@/utils/types";
import React from "react";
import ChatListItem from "./ChatListItem";
import NoDataAvailable from "../shared/NoDataAvailable";

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
  if (
    conversations &&
    Array.isArray(conversations) &&
    conversations?.length > 0
  ) {
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
  }
  return <NoDataAvailable message="No chats found" />;
};

export default ChatListItems;
