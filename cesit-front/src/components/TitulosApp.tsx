import { Typography } from '@mui/material';
import React, { FC } from 'react';

interface TitulosAppProps {
  title: string;
  children?: any;
}

const TitulosApp: FC<TitulosAppProps> = ({ title, children }) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      {children}
    </>
  );
};

export default TitulosApp;
