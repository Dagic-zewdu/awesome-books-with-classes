import Book from './book.class.js';

export default class Books {
  constructor() {
    this.books = [];
  }

  addBooks(title, author, id) {
    const b = new Book(title, author, id); // making single book
    this.books.push(b); // pushing them into books
  }

  getBooks() {
    return this.books;
  }

  removeBook(id) {
    const books = this.books.filter((b) => b.id.toString() !== id);
    this.books = books;
  }
}