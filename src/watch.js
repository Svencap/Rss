import onChange from 'on-change';
// import i18next from 'i18next';
import renderValid from './render/renderValid';
import renderFeeds from './render/renderFeeds';
import renderPost from './render/renderPost';
import request from './render/axiosTimeout';

const watchState = (state) => onChange(state, (path, value) => {
  // const input = document.querySelector('input');
  // const validateParagh = document.querySelector('.feedback');
  switch (path) {
    case 'form.inputUrl':
      break;
    case 'validateForm':
      renderValid(state, path, value);
      break;
    case 'form.error':
      renderValid(state, path, value);
      break;
    case 'form.posts':
      renderPost(value);
      break;
    case 'form.feeds':
      renderFeeds(value);
      break;
    case 'form.rssLinks':
      request(state, value);
      // console.log('Добавилась ссылка в state');
      break;
    default:
      console.log('123');
      break;
  }
});
export default watchState;
