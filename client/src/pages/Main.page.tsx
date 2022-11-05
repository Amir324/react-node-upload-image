import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import axios from "axios";
import ChooseFileComponent from "../components/ChooseFile.component";
import UploadFileButtonComponent from "../components/UploadFileButton.component";
import ImageComponent from "../components/Image.component";
import gopher from "../images/gopher.png"


enum TTL {
    "ten" = 10,
    "twenty" = 20,
    "thirty" = 30
}

const MainPage = () => {

    const [image, setImage] = useState<File | undefined>(undefined)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ttl, setTtl] = useState<TTL>(TTL.ten)
    const [link, setLink] = useState("")
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0]
        if (!file) {
            return
        }

        setImage(file)
    }

    const uploadHandler = async () => {
        if (!image) {
            return
        }

        try {
            const data = new FormData()
            console.log({image})
            data.append('file', image)
            const res = await axios.post("http://localhost:8080/v1/file", data, {
                headers: {
                    "x-ttl": ttl
                }
            })
            setSuccess(true)
            setLink("http://localhost:3000/" + res.data.filepath)

            console.log({res})
        } catch (e) {
            console.log("error", e)
        }

    }

    const ttlChangeHandeler = (e: SelectChangeEvent<TTL>) => {
        setTtl(e.target.value as TTL)
    }


    return (
        <Container disableGutters>
            <Box height={"100vh"} display={'flex'} alignItems={"center"} justifyContent={"center"}>
                <Box display={'flex'} alignItems={"center"} justifyContent={"center"}
                     flexDirection={'column'}
                     sx={{width: 500, height: 500}}>

                    <Box height={100}>
                        <img height={"100%"} src={gopher} alt="gopher"/>
                    </Box>
                    <Box width={"100%"} sx={{height: 300, padding: "10px", border: "1px solid grey", borderRadius: "8px"}}>
                        {image ? <ImageComponent image={image}/> : <Typography>Please select meme</Typography>}</Box>
                    <Box>
                        {link && link}
                    </Box>
                    <Box width={"100%"} mt={2}><FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select expiration period (seconds) </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ttl}
                            label="Select expiration period (seconds)"
                            onChange={ttlChangeHandeler}
                        >
                            <MenuItem value={TTL.ten}>Ten</MenuItem>
                            <MenuItem value={TTL.twenty}>Twenty</MenuItem>
                            <MenuItem value={TTL.thirty}>Thirty</MenuItem>
                        </Select>
                    </FormControl></Box>

                    <Box mt={2}>
                        <form>
                        <ChooseFileComponent onChange={onChangeHandler}/>
                        </form>
                    </Box>
                    <Box mt={2}>
                        {/*<UploadFileButtonComponent disabled={!Boolean(image)} onClick={uploadHandler}/>*/}
                        <UploadFileButtonComponent onClick={uploadHandler}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default MainPage;

