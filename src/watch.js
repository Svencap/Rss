import onChange from 'on-change';
// import i18next from 'i18next';
import renderValid from './render/renderValid';
import renderFeeds from './render/renderFeeds';
import renderPost from './render/renderPost';
import request from './render/axiosTimeout';
import renderModal from './render/renderModal';

const watchState = (state) => onChange(state, (path, value) => {
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
      break;
    case 'form.currentPost':
      renderModal(value);
      break;
    default:
      console.log('123');
      break;
  }
});
export default watchState;
