import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import no_image from "../images/no_image.png";
import { Box } from "@mui/material";
import { imageService } from "../services/image.service";

const MemePage = () => {
  const location = useLocation();
  const [imagePath, setImagePath] = useState("");
  useEffect(() => {
    imageService
      .get<Blob>(location.pathname, {
        responseType: "blob",
      })
      .then((res) => {
        setImagePath(URL.createObjectURL(res));
      })
      .catch(() => {
        setImagePath(no_image);
      });
  }, []);

  return (
    <Box height={200}>
      <img height={"100%"} src={imagePath} />
    </Box>
  );
};

export default MemePage;
