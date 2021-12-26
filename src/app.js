/* eslint-disable no-param-reassign */
import { setLocale } from 'yup';
import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
// import axios from 'axios';
// import { date } from 'yup';
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
            }
            else watchState.validateForm = 'is-valid';
          });
      })
      .catch((error) => {
        watchState.form.error = i18next.t(error.message);
      });
  });
};
export default app;

/**
 *       .then((valid) => {
        console.log(valid);
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
 */
