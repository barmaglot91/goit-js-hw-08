import throttle from 'lodash.throttle';
import { getRefs } from './getRefs';
import storage from './storage';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const refs = getRefs();

initForm();
refs.form.addEventListener('input', throttle(saveInLocalStorage, 500));


function saveInLocalStorage(event) {
  let savedData = storage.load(LOCALSTORAGE_KEY);
  savedData = savedData ? savedData : {};
  const { email, value } = event.target;
  savedData[email] = value;
  storage.save(LOCALSTORAGE_KEY, savedData);
}

function initForm() {
  let savedData = storage.load(LOCALSTORAGE_KEY);
  if (savedData) {
    refs.form.elements.email.value = savedData.email;
    Object.entries(savedData).forEach(([email, value]) => {
      refs.form.elements[value] = email;
    });
  }
}
refs.form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const { email, message } = event.target.elements;

  if (email.value === '' || message.value === '') {
    console.log('Заповніть всі поля');
    return;
  }
  const formData = new FormData(refs.form);
  const userData = {};
  formData.forEach((value, email) => {
    userData[email] = value;
  });
  console.log(userData);
  event.target.reset();
  storage.remove(LOCALSTORAGE_KEY);

  
}

