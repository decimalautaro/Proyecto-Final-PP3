import { Grid, Paper, styled } from '@mui/material';
import React, { FC } from 'react';

interface CustomLabelProps {
  textAlign?: 'right' | 'left' | 'center';
}

const CustomLabel = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'textAlign',
})<CustomLabelProps>(({ theme, textAlign = 'left' }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: textAlign,
  color: theme.palette.text.secondary,
}));

interface CustomLabelItemProps {
  label: string;
  value: string | number | undefined;
}

const CustomLabelItem: FC<CustomLabelItemProps> = ({ label, value }) => {
  return (
    <>
      <Grid item xs={4}>
        <CustomLabel textAlign="right">{label}</CustomLabel>
      </Grid>
      <Grid item xs={8}>
        <CustomLabel textAlign="left">{value ?? ' - '}</CustomLabel>
      </Grid>
    </>
  );
};

export default CustomLabelItem;
