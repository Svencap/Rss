const parserDom = (content) => {
  const parser = new DOMParser();
  return parser.parseFromString(content, 'application/xml');
};
export default parserDom;
