import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import axios from "axios";

const MemePage = () => {
    const location = useLocation()
    // const [imagePath, setImagePath] = useState("")
    // useEffect(() => {
    //     axios.get("http://localhost:8080/v1" + location.pathname).then(res => {
    //         setImagePath(res.data.path)
    //     }).catch((e) => {
    //              console.log("e", e)
    //     })
    //
    // }, [])


    console.log(process.env.REACT_APP_SERVER)

    return (
        <div>
            <img src={process.env.REACT_APP_SERVER + "/v1" + location.pathname}/>
        </div>
    );
};

export default MemePage;