import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onYes: () => void;
    onNo: () => void;
    message: string;
}

const ConfirmationModalCarrera: FC<ConfirmationModalProps> = ({ open, onClose, onYes, onNo, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Eliminando Carrera?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNo}>No</Button>
                <Button
                    onClick={onYes}
                    autoFocus
                >
                    Si
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModalCarrera