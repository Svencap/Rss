import i18next from 'i18next';

const renderValid = (state, value) => {
  const input = document.querySelector('input');
  const validateParagh = document.querySelector('.feedback');
  if (value === 'valid') {
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
    validateParagh.textContent = i18next.t('isValid');
    validateParagh.classList.remove('text-danger');
    validateParagh.classList.add('text-success');
  } else {
    input.classList.add('is-invalid');
    validateParagh.textContent = state.textError;
    validateParagh.classList.remove('text-success');
    validateParagh.classList.add('text-danger');
  }
};
export default renderValid;
