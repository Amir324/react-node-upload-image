import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import no_image from "../images/no_image.png";
import { Box } from "@mui/material";
import { imageService } from "../services/image.service";

const MemePage = () => {
  const location = useLocation();
  const [imagePath, setImagePath] = useState("");
  useEffect(() => {
    // axios
    //   .get(process.env.REACT_APP_SERVER + "/v1/file" + location.pathname, {
    //     responseType: "blob",
    //   })
    //   .then((res) => {
    //     setImagePath(URL.createObjectURL(res.data));
    //   })
    //   .catch(() => {
    //     setImagePath(no_image);
    //   });

    imageService
      .get<any>(location.pathname, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        setImagePath(URL.createObjectURL(res));
      });
  }, []);

  return (
    <Box height={200}>
      <img height={"100%"} src={imagePath} />
    </Box>
  );
};

export default MemePage;
