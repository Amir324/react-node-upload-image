import React, { useCallback } from "react";
import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ImageComponent from "./Image.component";

interface Props {
  onChange: any;
  image?: File;
}

const ChooseFileComponent = ({ onChange, image }: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    onChange(acceptedFiles?.[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          minHeight: 300,
          padding: "10px",
          backgroundColor: "lightgrey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box flexGrow={1} sx={{ display: "grid", placeItems: "center" }}>
          <ImageComponent image={image} />
        </Box>
        <input hidden {...getInputProps()} />
      </Box>
    </>
  );
};

export default ChooseFileComponent;
