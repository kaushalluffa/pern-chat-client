import { IKImage } from "imagekitio-react";
import React from "react";

const ViewAttachedMedia = ({ src }: { src: string }) => {
  return <IKImage src={src} width="400" />;
};

export default ViewAttachedMedia;
