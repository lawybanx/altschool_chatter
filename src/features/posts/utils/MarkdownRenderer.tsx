import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import remarkGemoji from 'remark-gemoji';
import remarkTypograf from '@mavrin/remark-typograf';
import remarkIns from 'remark-ins';

interface MarkdownRendererProps {
  content?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const theme = useColorModeValue('light', 'dark');

  return (
    <MarkdownPreview
      source={content}
      wrapperElement={{
        'data-color-mode': theme,
      }}
      style={{
        padding: '1.5rem',
      }}
      remarkPlugins={[remarkGemoji, remarkTypograf, remarkIns]}
    />
  );
};

export default MarkdownRenderer;
