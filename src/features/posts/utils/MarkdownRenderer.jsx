import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const MarkdownRenderer = ({ content }) => {
  const theme = useColorModeValue('light', 'dark');

  return (
    <Box p={{ base: '1rem', md: '1.5rem' }}>
      <MarkdownPreview
        source={content}
        wrapperElement={{
          'data-color-mode': theme,
        }}
        style={{
          padding: '1rem 2rem',
        }}
      />
    </Box>
  );
};

export default MarkdownRenderer;
