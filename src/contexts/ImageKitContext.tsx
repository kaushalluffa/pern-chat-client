import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { IKUpload } from "imagekitio-react";
import React, { createContext, useContext, useRef, useState } from "react";
export const ImageKitContext = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ikUploadRef: any | null;
  uploadImgLoading: boolean;
  setUploadImgLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fileUrl: string | null;
  setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  ikUploadRef: null,
  uploadImgLoading: false,
  setUploadImgLoading: () => {},
  fileUrl: null,
  setFileUrl: () => {},
});
const ImageKitContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [uploadImgLoading, setUploadImgLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  return (
    <ImageKitContext.Provider
      value={{
        uploadImgLoading,
        setUploadImgLoading,
        ikUploadRef,
        fileUrl,
        setFileUrl,
      }}
    >
      {children}
      <IKUpload
        ref={ikUploadRef}
        style={{ display: "none" }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess={(data: any) => {
          setFileUrl(data?.url);
          setUploadImgLoading(false);
        }}
        onUploadStart={() => {
          console.log(1);
          setUploadImgLoading(true);
        }}
        onError={(error) => {
          console.log(error);
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
