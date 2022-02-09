import Books from './books.class.js';

// form
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
let TitleInputField;
let AuthorInputField;
let tab = 'book-list';

const booksClass = new Books();
const updateStorage = () => {
  const stringfiedBL = JSON.stringify(booksClass.getBooks());
  localStorage.setItem('booklist', stringfiedBL);
};
const renderBooks = () => {
  const Books = booksClass.getBooks();
  let li = '';
  Books.forEach((book, index) => {
    li += `<li class="book-item ${index % 2 ? '' : 'bg-black'}">
       <div class="book-title">"${book.title}" by ${book.author}</div>
       <button class="btn-remove" id=${book.id}>remove</button>
   </li>`;
  });
  bookContainer.innerHTML = li;
  const removeBtn = document.querySelectorAll('.btn-remove');
  removeBtn.forEach((button) => button.addEventListener('click', () => {
    booksClass.removeBook(button.id);
    updateStorage();
    renderBooks();
  }));
};
const addBooks = (title, author, id) => {
  booksClass.addBooks(title, author, id);
  renderBooks();
  updateStorage();
  message.textContent = 'Book added';
};
function updateUserInterface() {
  const retrievedData = localStorage.getItem('booklist');
  const bookList = JSON.parse(retrievedData);
  bookList.forEach((book) => booksClass.addBooks(book.title, book.author, book.id));
  renderBooks();
}
const render = () => {
  if (tab === 'book-list') {
    bookFormSection.style.display = 'none';
    contacts.style.display = 'none';
    bookContainerSection.style.display = 'flex';
  }
  if (tab === 'book-form') {
    bookFormSection.style.display = 'flex';
    contacts.style.display = 'none';
    bookContainerSection.style.display = 'none';
  }
  if (tab === 'contact') {
    bookFormSection.style.display = 'none';
    contacts.style.display = 'block';
    bookContainerSection.style.display = 'none';
  }
};

if (!localStorage.getItem('booklist')) {
  updateStorage();
  render();
} else {
  updateUserInterface();
  render();
}

// adding event listeners to the nav
booksListNav.addEventListener('click', () => {
  tab = 'book-list';
  render();
});
booksFormNav.addEventListener('click', () => {
  tab = 'book-form';
  render();
});
contactsNav.addEventListener('click', () => {
  tab = 'contact';
  render();
});
inputs.forEach((input) => {
  if (input.id === 'title') {
    TitleInputField = input;
    TitleInputField.addEventListener('keyup', () => { message.textContent = ''; });
  } else if (input.id === 'author') {
    AuthorInputField = input;
    AuthorInputField.addEventListener('keyup', () => { message.textContent = ''; });
  }
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  message.textContent = '';
  const author = AuthorInputField.value;
  const title = TitleInputField.value;
  addBooks(title, author);
});