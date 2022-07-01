import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  formData[e.target.name] = e.target.value;
  handleClearForm();
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function handleClearForm() {
  formRef.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateTextarea() {
  let savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage);
    Object.entries(savedMessage).forEach(([key, value]) => {
      formData[key] = value;
      formRef.elements[key].value = value;
    });
  }
}
