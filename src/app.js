/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
// import uniqueId from 'lodash';
import parserDom from './DOMparser';

setLocale({
  string: {
    url: 'errorUlr',
  },
});
const schema = yup.object().shape({
  url: yup
    .string()
    .url()
    .required(),
});
const app = (state, watchState) => {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  input.addEventListener('change', (e) => {
    e.preventDefault();
    watchState.form.inputUrl = e.target.value;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    schema
      .validate({
        url: state.form.inputUrl,
      })
      .then((data) => {
        axios.get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(`${data.url}`)}&disableCache=true)`)
          .then((res) => {
            const type = res.data.status.content_type.substring(0, res.data.status.content_type.indexOf(';'));
            if (type === 'text/html') {
              watchState.form.error = i18next.t('invalidRss');
            } else {
              const parse = parserDom(res.data.contents);
              watchState.validateForm = 'is-valid';
              watchState.form.posts = [...state.form.posts, ...parse.posts];
              watchState.form.feeds = [...state.form.feeds, ...parse.feeds];
            }
          });
      })
      .catch((error) => {
        watchState.form.error = i18next.t(error.message);
      });
  });
};
export default app;
