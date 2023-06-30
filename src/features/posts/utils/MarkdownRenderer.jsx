import { Box, 
  // useColorModeValue 
} from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-light.css';
// import javascript from 'highlight.js/lib/languages/javascript';
// import '@wcj/markdown-style';

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

  return (
    // <markdown-style theme={useColorModeValue('light', 'dark')}>
    //   </markdown-style>
    <Box
      as='div'
      p={{ base: '1rem', md: '1.5rem' }}
      dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
    />
  );
};

export default MarkdownRenderer;
