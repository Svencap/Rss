/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import * as yup from 'yup';
import i18next from 'i18next';
// import axios from 'axios';
// import { date } from 'yup';

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
    .test('url', 'invalidRss', (value) => value.match(/.rss$/)),
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
        if (!state.posts.includes(valid.url)) {
          watchState.validate = 'valid';
          watchState.textError = '';
          watchState.posts = [valid.url, ...state.posts];
        } else {
          watchState.textError = i18next.t('duplicateUrl');
          watchState.validate = 'invalid';
        }
      })
      .catch((error) => {
        console.log(error.message);
        watchState.textError = i18next.t(error.message);
        watchState.validate = 'invalid';
      });
    fetch(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent('http://lorem-rss.herokuapp.com/feed')}&disableCache=true
)`)
      .then((res) => res.json())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'application/xml');
        console.log(doc);
      });
  });
};
export default app;
