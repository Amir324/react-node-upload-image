import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface Props {
  value: string;
}

const CopyToClipboardButton = ({ value }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    setOpen(true);
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary" disableRipple>
        <ContentCopyIcon />
      </IconButton>
      <Snackbar
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;
