const randomId=()=>Math.round(Math.random()*10000)
export class Book{
    constructor(title,author,id){
        this.id=id?id:randomId()
        this.title=title
         this.author=author
    }
}

export class Books{
    constructor(){
        this.books=[]
    }
   addBooks(title,author,id){
   let b= new Book(title,author,id) // making single book
    this.books.push(b) //pushing them into books
   }
   getBooks(){
       return this.books;
   }
   removeBook(id){
       let books=this.books.filter(b=> b.id.toString() !== id)
       this.books=books
   }
}