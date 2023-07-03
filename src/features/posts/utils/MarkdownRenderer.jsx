import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import remarkGemoji from 'remark-gemoji';
import remarkTypograf from '@mavrin/remark-typograf';
import remarkIns from 'remark-ins';
import remarkSubSuper from 'remark-sub-super';

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
        remarkPlugins={[
          remarkGemoji,
          remarkTypograf,
          remarkIns,
          // remarkSubSuper,
        ]}
      />
    </Box>
  );
};

export default MarkdownRenderer;
