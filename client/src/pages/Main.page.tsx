import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ChooseFileComponent from "../components/ChooseFile.component";
import UploadFileButtonComponent from "../components/UploadFileButton.component";
import gopher from "../images/gopher.png";
import CopyToClipboardButton from "../components/CopyToClipboard.component";
import { imageService } from "../services/image.service";

enum TTL {
  "minute" = 60,
  "tenminutes" = 600,
  "onehour" = 3600,
}

const MainPage = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ttl, setTtl] = useState<TTL>(TTL.onehour);
  const [link, setLink] = useState("");
  const onChangeHandler = (file: File) => {
    if (!file) {
      return;
    }
    setImage(file);
  };

  const uploadHandler = async () => {
    if (!image) {
      return;
    }

    try {
      const data = new FormData();
      data.append("file", image);
      // setLoading(true);
      // const res = await axios.post("http://localhost:8080/v1/file", data, {
      //   headers: {
      //     "x-ttl": ttl,
      //   },
      // });
      // setSuccess(true);
      // setLink("http://localhost:3000/" + res.data.filepath);

      setLoading(true);
      const res = await imageService.create<FormData, { filepath: string }>(
        data,
        {
          headers: {
            "x-ttl": ttl,
          },
        }
      );
      setSuccess(true);
      setLink(window.origin + "/" + res.filepath);
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  const ttlChangeHandeler = (e: SelectChangeEvent<TTL>) => {
    setTtl(e.target.value as TTL);
  };

  return (
    <Container disableGutters>
      <Box
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box sx={{ width: 500, height: 500 }}>
          <Box height={100} display={"flex"} justifyContent={"center"}>
            <img height={"100%"} src={gopher} alt="gopher" />
          </Box>
          {link ? (
            <Box display={"flex"} mt={2}>
              <TextField type="text" value={link} disabled fullWidth />{" "}
              <CopyToClipboardButton value={link} />
            </Box>
          ) : (
            <>
              <Box width={"100%"} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select expiration period (seconds){" "}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ttl}
                    label="Select expiration period (seconds)"
                    onChange={ttlChangeHandeler}
                  >
                    <MenuItem value={TTL.minute}>1 minute</MenuItem>
                    <MenuItem value={TTL.tenminutes}>10 minutes</MenuItem>
                    <MenuItem value={TTL.onehour}>1 hour</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2}>
                <ChooseFileComponent onChange={onChangeHandler} image={image} />
              </Box>
              <Box mt={2}>
                <UploadFileButtonComponent
                  onClick={uploadHandler}
                  loading={loading}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
