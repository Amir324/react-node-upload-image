import React from 'react';
import {Button} from "@mui/material";

interface Props {
    onClick: VoidFunction,
    disabled?: boolean
}

const UploadFileButtonComponent = ({onClick, disabled}: Props) => {
    return (
        <Button disabled={disabled} onClick={onClick} variant="contained" fullWidth >
            Upload
        </Button>
    );
};

export default UploadFileButtonComponent;