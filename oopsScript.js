//Book Class storing book data 
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

class Store{
   static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
        books=[];
    }else{
        books=JSON.parse(localStorage.getItem('books'))
    }
    return books;
    }

    static addBook(book){
     const books=Store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(year){
     const books=Store.getBooks();
     books.forEach((book,index    )=>{
     if(book.year===year){
         books.splice(index,1);
     }
     });
     localStorage.setItem('books',JSON.stringify(books));
    }
}

//manage ui changes

class UI{
    static displayBooks(){
        // const StoredBooks=[
        // {
        //     title:'Book one',
        //     author:"jk rowling",
        //     year:"2015"
        // },
        // {
        //     title:'Book two',
        //     author:"amish",
        //     year:"2018"
        // }
        // ];

        const books=Store.getBooks();

      books.forEach((book)=>{
         UI.addBookToList(book);
      })
        
    }

    static addBookToList(book){

        const tblBooklist=document.querySelector("#book-list");
        var row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td><input type="submit" class="btn btn-danger delete"  value="x"></td>
    `;
    tblBooklist.appendChild(row);

    }


    static deletebooks(el){
     if(el.classList.contains('delete')){
         el.parentElement.parentElement.remove();
     }
    }

    static clearFields(){
       document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#year").value= "";
      
    }
}


//handle event :display books

document.addEventListener('DOMContentLoaded',UI.displayBooks)


//event add a book

document.querySelector("#book-form").addEventListener('submit',(e)=>{
  e.preventDefault();

  //get form values
  
  const title= document.querySelector("#title").value;
  const author= document.querySelector("#author").value;
  const year= document.querySelector("#year").value;


  if(title !== "" || author !==""  || year !==""){
//instatitate book
const book= new Book(title,author,year);
console.log(book)
//add book

UI.addBookToList(book);

//add book to store
Store.addBook(book);

//clear fields
UI.clearFields();
  }
  else{
      alert("please enter all the fields")
  }

  


})

//event for delete a book
document.querySelector("#book-list").addEventListener('click',(e)=>{
    console.log(e.target.parentElement.previousElementSibling.textContent);
UI.deletebooks(e.target);
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})
