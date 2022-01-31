/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import renderPost from './renderPost';
import parserDom from '../DOMparser';
import generatedId from '../generatedID';
import renderModal from './renderModal';

const isEqual = (obj1, obj2) => obj1.title === obj2.title;

const request = (state, rssLinks) => {
  setTimeout(() => {
    rssLinks.forEach((link) => {
      axios.get(link)
        .then((res) => {
          const parse = parserDom(res.data.contents).postsParse;
          const union = _.unionWith(state.form.posts, parse, isEqual);
          state.form.posts = generatedId(union);
          renderPost(state.form.posts);
          const buttonView = document.querySelectorAll('[data-bs-toggle=modal]');
          buttonView.forEach((button) => {
            button.addEventListener('click', (e) => {
              const currentEl = state.form.posts.find(({ id }) => id === e.target.id);
              state.form.currentPost = currentEl;
              renderModal(state.form.currentPost);
            });
          });
        })
        .catch((error) => console.log(error));
    });
    request(state, rssLinks);
  }, 5000);
};
export default request;
