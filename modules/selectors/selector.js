const form = document.querySelector('#form');
const inputs = form.querySelectorAll('input'); // inputs of the form
const bookContainer = document.querySelector('ul.book-list');
const booksListNav = document.querySelector('.nav-item.vl.nav-book-list');
const booksFormNav = document.querySelector('.nav-item.vl.nav-add-books');
const contactsNav = document.querySelector('.nav-item.nav-contacts');
const message = document.querySelector('p.message');
const bookFormSection = document.getElementById('book-form');
const contacts = document.getElementById('contact');
const bookContainerSection = document.getElementById('added-books');
const TimeContainer = document.querySelector('li.time');
let TitleInputField;
let AuthorInputField;

inputs.forEach((input) => {
  if (input.id === 'title') {
    TitleInputField = input;
    TitleInputField.addEventListener('keyup', () => { message.textContent = ''; });
  } else if (input.id === 'author') {
    AuthorInputField = input;
    AuthorInputField.addEventListener('keyup', () => { message.textContent = ''; });
  }
});

const selector = {
  form,
  inputs,
  bookContainer,
  booksListNav,
  booksFormNav,
  contactsNav,
  message,
  bookFormSection,
  contacts,
  bookContainerSection,
  TitleInputField,
  AuthorInputField,
  TimeContainer,
};
export default selector;