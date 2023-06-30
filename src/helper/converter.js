import * as Showdown from 'showdown';

const converter = () => {
  return new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
};

export default converter;
