/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import * as yup from 'yup';
import i18next from 'i18next';

setLocale({
  string: {
    url: 'errorUlr',
  },
});
const schema = yup.object().shape({
  url: yup
    .string()
    .url()
    .required()
    // Изменить регулярку
    .test('url', 'invalidRss', (value) => value.match(/.rss$/)),
  // Придумать как протестировать функцию на дубликаты
// .test('url', 'duplicateUrl', (value) => state.posts.includes(value))
});

const app = (state, watchState) => {
  const form = document.querySelector('form');
  const input = document.querySelector('input');

  input.addEventListener('change', (e) => {
    e.preventDefault();
    watchState.inputUrl = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    schema
      .validate({
        url: state.inputUrl,
      })
      .then((valid) => {
        watchState.validate = 'valid';
        watchState.textError = '';
        watchState.posts = [valid.url, ...state.posts];
      })
      .catch((error) => {
        console.log(error.message);
        watchState.textError = i18next.t(error.message);
        watchState.validate = 'invalid';
      });
  });
};
export default app;
