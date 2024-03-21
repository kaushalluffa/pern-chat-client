/* eslint-disable @typescript-eslint/no-explicit-any */
import { VITE_CLOUDINARY_CLOUD_NAME } from "@/utils/constants";
import { useEffect, useRef } from "react";

export default function useCloudinaryFileUpload() {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: VITE_CLOUDINARY_CLOUD_NAME as string,
        uploadPreset: "ybmvmgdn",
      },
      function (error: any, result: any) {
        console.log(result?.info?.files?.[0]?.uploadInfo?.url);
      }
    );
  }, []);
  function hanleOpenCloudinaryWidget() {
    widgetRef?.current?.open() && widgetRef?.current?.open();
  }
  return { hanleOpenCloudinaryWidget };
}
