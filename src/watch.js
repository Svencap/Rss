/* eslint-disable no-undef */
import onChange from 'on-change';
import i18next from 'i18next';

const watchState = (state) => onChange(state, (path, value) => {
  const input = document.querySelector('input');
  const validateParagh = document.querySelector('.feedback');

  if (path === 'validate') {
    validateParagh.textContent = state.textError;
    if (value === 'invalid') {
      input.classList.add('is-invalid');
      input.value = '';
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
});
export default watchState;
