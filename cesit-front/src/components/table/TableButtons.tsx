import { IconButton, Tooltip } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { FC } from "react";

interface TableButtonProps {
    color: 'primary' | 'warning' | 'error';
    iconType: 'show' | 'edit' | 'delete';
    onClick: () => void;
}

export const TableButton: FC<TableButtonProps> = ({ iconType, onClick, color }) => {
    return (
        <Tooltip title={iconType}>
            <IconButton color={color} arial-label="visibility" onClick={onClick}>
                {iconType === 'show' && <VisibilityIcon />}
                {iconType === 'edit' && <EditIcon />}
                {iconType === 'delete' && <DeleteIcon />}
            </IconButton>
        </Tooltip>

    )
}

interface TableIconProps {
    onClick: () => void;
}

export const TableShowBtn: FC<TableIconProps> = ({ onClick }) => <TableButton iconType="show" color="primary" onClick={onClick} />;
export const TableEditBtn: FC<TableIconProps> = ({ onClick }) => <TableButton iconType="edit" color="warning" onClick={onClick} />;
export const TableDeleteBtn: FC<TableIconProps> = ({ onClick }) => <TableButton iconType="delete" color="error" onClick={onClick} />;