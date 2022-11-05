import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  onClick: VoidFunction;
  disabled?: boolean;
  loading?: boolean;
}

const UploadFileButtonComponent = ({ onClick, disabled, loading }: Props) => {
  return (
    <LoadingButton
      fullWidth
      loading={loading}
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant={"contained"}
      onClick={onClick}
      disabled={disabled}
    >
      UPLOAD
    </LoadingButton>
  );
};

export default UploadFileButtonComponent;
