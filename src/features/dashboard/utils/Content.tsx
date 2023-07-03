import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Content: React.FC = () => {
  return (
    <Box
      flex='1'
      ms={{ base: '0 !important', md: '.5rem !important' }}
      p={{ base: '.5rem', md: '0' }}
    >
      <Outlet />
    </Box>
  );
};

export default Content;
