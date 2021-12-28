import { uniqueId } from 'lodash';

const parserDom = (content) => {
  const result = {
    posts: [],
    feeds: [],
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'application/xml');

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescription = doc.querySelector('description').textContent;

  const posts = Array.from(doc.querySelectorAll('item')).map((item) => {
    const linkFeed = item.querySelector('link').textContent;
    const titleFeed = item.querySelector('title').textContent;
    const descriptionFeed = item.querySelector('description').textContent;
    return { title: titleFeed, description: descriptionFeed, link: linkFeed };
  });

  result.posts = [...posts];
  result.feeds.push({ id: uniqueId(), title: feedTitle, description: feedDescription });
  return result;
};
export default parserDom;
