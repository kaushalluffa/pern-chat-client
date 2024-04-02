import { deleteImageKitFile } from "@/api/imageKitApiHandlers";
import { deleteMessage, sendMessage } from "@/api/messagesApiHandlers";
import { Member, Message } from "@/utils/types";
import { useEffect, useState } from "react";
import { useAuthContext, useConversationContext, useImageKitContext } from './useAllContextHooks';
export default function useMessages() {
  const { loggedInUser } = useAuthContext()!;
  const { currentConversation } = useConversationContext()!;
  const {
    ikUploadRef,
    uploadImgLoading,
    fileUrl,
    setFileUrl,
    fileId,
    setFileId,
  } = useImageKitContext();
  const [openEmojiPicker, setOpenEmojiPicker] = useState<HTMLElement | null>(
    null
  );
  const [openViewAttachedMediaModal, setOpenViewAttachedMediaModal] =
    useState<boolean>(false);
  const [messageBody, setMessageBody] = useState<{
    fileId?: string | null;
    body: string;
    fileUrl?: string | null;
  }>({ body: "", fileId: null, fileUrl: null });
  function handleReset() {
    setFileUrl(null);
    setFileId(null);
    setMessageBody({ fileId: null, fileUrl: null, body: "" });
  }
  async function handleDeleteImageKitFile(fileId: string) {
    await deleteImageKitFile(fileId);
    handleReset();
    setOpenViewAttachedMediaModal(false);
    ikUploadRef.current.value = "";
  }
  function handleCloseViewAttachedFilesModal() {
    handleReset();
    setOpenViewAttachedMediaModal(false);
    ikUploadRef.current.value = "";
  }
  async function handleSendMessage() {
    await sendMessage({
      conversationId: currentConversation?.id as string,
      messageBody,
      senderId: currentConversation?.members?.find(
        (member: Member) => member?.userId === loggedInUser?.user?.id
      )?.id as string,
    });
    handleCloseViewAttachedFilesModal();
  }
  async function handleDeleteMessage(message: Message) {
    await deleteMessage({ message });
  }
  useEffect(() => {
    if (fileUrl && fileId) {
      setMessageBody({ body: "", fileUrl: fileUrl, fileId: fileId });
      setOpenViewAttachedMediaModal(true);
    }
  }, [fileUrl, fileId]);
  return {
    handleSendMessage,
    messageBody,
    setMessageBody,
    handleReset,
    ikUploadRef,
    setOpenEmojiPicker,
    uploadImgLoading,
    openEmojiPicker,
    openViewAttachedMediaModal,
    setOpenViewAttachedMediaModal,
    handleDeleteImageKitFile,
    fileId,
    handleCloseViewAttachedFilesModal,
    handleDeleteMessage,
  };
}
