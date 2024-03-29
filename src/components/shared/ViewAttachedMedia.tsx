import { checkIfUrlIsImage, checkIfUrlIsVideo } from "@/utils/helpers";
import { Typography, useMediaQuery } from "@mui/material";
import { IKImage, IKVideo } from "imagekitio-react";
import React from "react";

const ViewAttachedMedia = ({ src }: { src: string }) => {
  const isMobile = useMediaQuery("(max-width: 320px)");
  const isVideo = checkIfUrlIsVideo(src);
  const isImage = checkIfUrlIsImage(src);
  if (isVideo && src?.split("/")?.pop()) {
    return (
      <IKVideo
        path={src?.split("/")?.pop() as string}
        controls={true}
        width={isMobile ? "200" : "400"}
      />
    );
  }
  if (isImage) {
    return <IKImage src={src} width={isMobile ? "200" : "400"} />;
  }
  return (
    <Typography variant="h6" fontWeight="bold">
      File Format is not supported
    </Typography>
  );
};

export default ViewAttachedMedia;
