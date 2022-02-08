import Books from './books.class.js';

// form
const form = document.querySelector('#form');
const inputs = form.querySelectorAll('input'); // inputs of the form
const bookContainer = document.querySelector('ul.book-list');
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
};
function updateUserInterface() {
  const retrievedData = localStorage.getItem('booklist');
  const bookList = JSON.parse(retrievedData);
  bookList.forEach((book) => booksClass.addBooks(book.title, book.author, book.id));
  renderBooks();
}

if (!localStorage.getItem('booklist')) {
  updateStorage();
} else {
  updateUserInterface();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let author; let title = '';
  inputs.forEach((input) => {
    if (input.id === 'title')title = input.value;
    else if (input.id === 'author') author = input.value;
  });
  addBooks(title, author);
});