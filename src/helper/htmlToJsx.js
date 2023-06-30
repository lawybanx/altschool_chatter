const parse = require('html-react-parser');

export const htmlToJsx = (html) => {
   return parse(html);
};
