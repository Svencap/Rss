import onChange from 'on-change';
// import i18next from 'i18next';
import renderValid from './render/renderValid';
import renderFeeds from './render/renderFeeds';
import renderPost from './render/renderPost';

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
    default:
      console.log('123');
      break;
  }
});
export default watchState;

/**
  if (path === 'validate') {
    if (value === 'invalid') {
      input.classList.add('is-invalid');
      input.value = '';
      validateParagh.textContent = state.textError;
      validateParagh.classList.remove('text-success');
      validateParagh.classList.add('text-danger');
    } else {
      input.classList.remove('is-invalid');
      input.value = '';
      validateParagh.textContent = i18next.t('isValid');
      validateParagh.classList.remove('text-danger');
      validateParagh.classList.add('text-success');
    }
  }
 */
