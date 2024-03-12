import StartConversationModal from "@/components/StartConversationModal/StartConversationModal";
import React, { createContext, useContext, useState } from "react";
const ModalsContext = createContext<{
  createConversationModal: {
    open: boolean;
  };
  setCreateConversationModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
    }>
  >;
}>({
  createConversationModal: { open: false },
  setCreateConversationModal: () => {},
});
const ModalsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [createConversationModal, setCreateConversationModal] = useState<{
    open: boolean;
  }>({ open: false });
  return (
    <ModalsContext.Provider
      value={{ createConversationModal, setCreateConversationModal }}
    >
      {createConversationModal?.open && <StartConversationModal />}
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContextProvider;
export const useModalsContext = () => {
  return useContext(ModalsContext);
};
