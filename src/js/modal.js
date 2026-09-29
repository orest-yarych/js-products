import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleEscPress);
  refs.modalCloseBtn.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', hanleBackdropClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscPress);
  refs.modalCloseBtn.removeEventListener('click', closeModal);
  refs.modal.removeEventListener('click', hanleBackdropClick);
}

function handleEscPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function hanleBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
