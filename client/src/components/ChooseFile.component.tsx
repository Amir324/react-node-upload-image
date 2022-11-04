import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {Button} from "@mui/material";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const ChooseFileComponent = ({onChange}: Props) => {
    return (
        <Button variant="contained" component="label" startIcon={<DriveFolderUploadIcon/>}>
            Choose Gopher Meme
            <input hidden accept="image/*" type="file" onChange={onChange}   />
        </Button>
    );
};

export default ChooseFileComponent;