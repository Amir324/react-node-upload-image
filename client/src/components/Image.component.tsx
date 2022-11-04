import React from 'react';
import {Box, Typography} from "@mui/material";

interface Props {
    image: File
}

const readFile = (file: File) => {
    if(!file){
        return ""
    }
    return URL.createObjectURL(file)
}


const ImageComponent = ({image}: Props) => {
    return (
         <Box
                component="img"
                sx={{
                    width: "100%",
                    maxHeight: "100%"
                }}
                src={readFile(image)}
            />
    );
};

export default ImageComponent;