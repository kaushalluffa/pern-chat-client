import { useModalsContext } from "@/contexts/ModalsContext";
import React from "react";
import StartConversationModal from "../StartConversationModal/StartConversationModal";

const AllModalsContainer = () => {
  const { createConversationModal } = useModalsContext();
  if (createConversationModal?.open) {
    return <StartConversationModal />;
  }
  return null;
};

export default AllModalsContainer;
