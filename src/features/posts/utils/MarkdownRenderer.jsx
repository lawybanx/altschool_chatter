import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const MarkdownRenderer = ({ content }) => {
  return <MarkdownPreview source={content} />;
};

export default MarkdownRenderer;
