import { Grid, Paper, styled, Button, Tooltip } from '@mui/material';
import { FC } from 'react';


interface LabelProps {
    textAlign?: 'right' | 'left' | 'center';
}

const CustomLabel = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'textAlign',
})<LabelProps>(({ theme, textAlign = 'left' }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: textAlign,
    color: theme.palette.text.secondary,
}));

interface LabelItemProps {
    label: string;
    value: string | number | undefined;
    onClick: any;
}

const LinkLabelItem: FC<LabelItemProps> = ({ label, value, onClick }) => {
    return (
        <>
            <Grid item xs={4}>
                <CustomLabel textAlign="right">{label}</CustomLabel>
            </Grid>
            <Grid item xs={8}>
                <CustomLabel textAlign="left">
                    <Tooltip title="Ver" placement="right">
                        <Button
                            variant="text"
                            onClick={onClick}
                            size="small"
                        >
                            {value ?? ' - '}
                        </Button>
                    </Tooltip>

                </CustomLabel>
            </Grid>
        </>
    );
};

export default LinkLabelItem;