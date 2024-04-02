import { Conversation } from "@/utils/types";
import React from "react";
import ChatListItem from "./ChatListItem";
import NoDataAvailable from "../shared/NoDataAvailable";
import { useConversationContext } from "@/hooks/useAllContextHooks";

const ChatListItems = () => {
  const {
    conversations,
    currentConversation,
    newMessagesInConversations,
    handleResetNewMessagesInConversation,
  } = useConversationContext()!;
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
          handleResetNewMessagesInConversation={
            handleResetNewMessagesInConversation
          }
          newMessagesInConversations={newMessagesInConversations}
        />
      );
    });
  }
  return <NoDataAvailable message="No chats found" />;
};

export default ChatListItems;
