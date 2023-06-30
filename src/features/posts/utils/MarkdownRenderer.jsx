import { Box, useColorModeValue } from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/atom-one-light.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import '@wcj/markdown-style';

// Register the desired language module
hljs.registerLanguage('javascript', javascript);

// Custom Markdown renderer component
const MarkdownRenderer = ({ content }) => {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    },
  });

  const theme = useColorModeValue('light', 'dark');

  return (
    <markdown-style theme={theme}>
      <Box
        as='div'
        p={{ base: '1rem', md: '1.5rem' }}
        dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
      />
    </markdown-style>
  );
};

export default MarkdownRenderer;
