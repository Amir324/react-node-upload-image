import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router";
import axios from "axios";
import no_image from "../images/no_image.png"
import {Box} from "@mui/material";

const MemePage = () => {
    const location = useLocation()
    const imageEl = useRef(null);
    const [imagePath, setImagePath] = useState("")
    useEffect(() => {
        axios.get("http://localhost:8080/v1" + location.pathname, { responseType: 'blob' }).then(res => {
            setImagePath(URL.createObjectURL(res.data))
        }).catch((e) => {
                setImagePath(no_image)
        })

    }, [])

    const onErrorHandler = (currentTarget: any) => {
        if(!imageEl?.current){
            return
        }
        //@ts-ignore
        imageEl.current.src = no_image
    }


    console.log(process.env.REACT_APP_SERVER)

    return (
        <Box height={200}>
            <img height={"100%"} onError={onErrorHandler} src={imagePath}/>
        </Box>
    );
};

export default MemePage;