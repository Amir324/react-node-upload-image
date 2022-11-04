import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import axios from "axios";
import ChooseFileComponent from "../components/ChooseFile.component";
import UploadFileButtonComponent from "../components/UploadFileButton.component";
import ImageComponent from "../components/Image.component";


const MainPage = () => {

    const [image, setImage] = useState<File | undefined>(undefined)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0]
        console.log({file})
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
            const res = await axios.post("http://localhost:8080/v1/file", data)
            setSuccess(true)

            console.log({res})
        } catch (e) {
            console.log("error", e)
        }

    }


    return (
        <Container disableGutters>
            <Box height={"100vh"} display={'flex'} alignItems={"center"} justifyContent={"center"}>
                <Box display={'flex'} alignItems={"center"} justifyContent={"center"}
                     flexDirection={'column'}
                     sx={{width: 500, height: 500, backgroundColor: "lightcoral"}}>
                    <Box sx={{height: 300, padding: "10px"}}>
                        {image ? <ImageComponent image={image}/> : <Typography>Please select meme</Typography>}</Box>

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

