import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

form.addEventListener('input', throttle(saveFormData, 500));

document.addEventListener('DOMContentLoaded', () => {
  const savedFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedFormData) {
    emailInput.value = savedFormData.email;
    messageTextarea.value = savedFormData.message;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log(formData);

  localStorage.removeItem('feedback-form-state');

  emailInput.value = '';
  messageTextarea.value = '';
});

function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}