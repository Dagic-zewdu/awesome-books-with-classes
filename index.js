import DateNowString from './modules/luxon/luxon.js';
import Books from './modules/class/books.class.js';
import selector from './modules/selectors/selector.js';

let tab = 'book-list'; // tab

const booksClass = new Books(); // calling books class

const updateStorage = () => {
  const stringfiedBL = JSON.stringify(booksClass.getBooks());
  localStorage.setItem('booklist', stringfiedBL);
};

const renderBooks = () => {
  const Books = booksClass.getBooks();
  let li = '';
  if (Books.length) {
    Books.forEach((book, index) => {
      li += `<li class="book-item ${index % 2 ? '' : 'bg-black'}">
       <div class="book-title">"${book.title}" by ${book.author}</div>
       <button class="btn-remove" id=${book.id}>remove</button>
   </li>`;
    });
  } else {
    li += '<li class="center">Book list is empty!</li>';
  }

  selector.bookContainer.innerHTML = li;
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
  selector.message.textContent = 'Book added';
  selector.TitleInputField.value = '';
  selector.AuthorInputField.value = '';
};

const updateUserInterface = () => {
  const retrievedData = localStorage.getItem('booklist');
  tab = localStorage.getItem('tab');
  const bookList = JSON.parse(retrievedData);
  bookList.forEach((book) => booksClass.addBooks(book.title, book.author, book.id));
  renderBooks();
};

const render = () => {
  if (tab === 'book-list') {
    selector.bookFormSection.style.display = 'none';
    selector.contacts.style.display = 'none';
    selector.bookContainerSection.style.display = 'flex';
  }
  if (tab === 'book-form') {
    selector.bookFormSection.style.display = 'flex';
    selector.contacts.style.display = 'none';
    selector.bookContainerSection.style.display = 'none';
  }
  if (tab === 'contact') {
    selector.bookFormSection.style.display = 'none';
    selector.contacts.style.display = 'block';
    selector.bookContainerSection.style.display = 'none';
  }
  localStorage.setItem('tab', tab);
};

if (!localStorage.getItem('booklist')) {
  updateStorage();
  render();
} else {
  updateUserInterface();
  render();
}

// adding event listeners to the nav
selector.booksListNav.addEventListener('click', () => {
  tab = 'book-list';
  render();
});

selector.booksFormNav.addEventListener('click', () => {
  tab = 'book-form';
  render();
});

selector.contactsNav.addEventListener('click', () => {
  tab = 'contact';
  render();
});

selector.form.addEventListener('submit', (e) => {
  e.preventDefault();
  selector.message.textContent = '';
  const author = selector.AuthorInputField.value;
  const title = selector.TitleInputField.value;
  addBooks(title, author);
});

selector.TimeContainer.textContent = DateNowString();