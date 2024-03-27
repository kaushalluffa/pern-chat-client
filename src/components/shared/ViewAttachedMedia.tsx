import { checkIfUrlIsImage, checkIfUrlIsVideo } from "@/utils/helpers";
import { Typography } from "@mui/material";
import { IKImage, IKVideo } from "imagekitio-react";
import React from "react";

const ViewAttachedMedia = ({ src }: { src: string }) => {
  const isVideo = checkIfUrlIsVideo(src);
  const isImage = checkIfUrlIsImage(src);
  if (isVideo && src?.split("/")?.pop()) {
    return (
      <IKVideo
        path={src?.split("/")?.pop() as string}
        controls={true}
        width="400"
      />
    );
  }
  if (isImage) {
    return <IKImage src={src} width="400" />;
  }
  return (
    <Typography variant="h6" fontWeight="bold">
      File Format is not supported
    </Typography>
  );
};

export default ViewAttachedMedia;
