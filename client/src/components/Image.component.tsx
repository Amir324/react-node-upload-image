import React from "react";
import { Box, Typography } from "@mui/material";
import imageIcon from "../images/picture.png";

interface Props {
  image?: File;
}

const readFile = (file: File) => {
  if (!file) {
    return "";
  }
  return URL.createObjectURL(file);
};

const ImageComponent = ({ image }: Props) => {
  if (!image) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <img height={100} src={imageIcon} />
        <Typography>drag and drop image</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      sx={{
        width: "100%",
        maxHeight: "100%",
      }}
      src={readFile(image)}
    />
  );
};

export default ImageComponent;
