import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { IKUpload } from "imagekitio-react";
import React, { createContext, useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
export const ImageKitContext = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ikUploadRef: any | null;
  uploadImgLoading: boolean;
  setUploadImgLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fileUrl: string | null;
  setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fileId: string | null;
  setFileId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  ikUploadRef: null,
  uploadImgLoading: false,
  setUploadImgLoading: () => {},
  fileUrl: null,
  setFileUrl: () => {},
  setFileId: () => {},
  fileId: null,
});
const ImageKitContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [uploadImgLoading, setUploadImgLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  return (
    <ImageKitContext.Provider
      value={{
        uploadImgLoading,
        setUploadImgLoading,
        ikUploadRef,
        fileUrl,
        setFileUrl,
        setFileId,
        fileId,
      }}
    >
      {children}
      <IKUpload
        ref={ikUploadRef}
        style={{ display: "none" }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess={(data: any) => {
          setFileUrl(data?.url);
          setFileId(data?.fileId);
          setUploadImgLoading(false);
        }}
        onUploadStart={() => {
          setUploadImgLoading(true);
        }}
        onError={(error) => {
          console.log(error);
          toast.error(
            error?.toString() ?? "Failed to upload the media. Please try again",
            {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }
          );
          setUploadImgLoading(false);
        }}
      />
      {uploadImgLoading && (
        <Dialog open={uploadImgLoading}>
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </Dialog>
      )}
    </ImageKitContext.Provider>
  );
};
export const useImageKitContext = () => {
  return useContext(ImageKitContext);
};
export default ImageKitContextProvider;
