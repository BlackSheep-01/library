
const myLibrary = [];  //array for storing all books

function Book(title,author,pages,readStatus){  //constructor
  this.title=title;
  this.author=author;
  this.pages=pages;
  this.readStatus=readStatus;
}

function addBookToLibrary(title,author,pages,readStatus){
  const newBook=new Book(title,author,pages,readStatus);   //create new book
  myLibrary.push(newBook);
}


function displayBooks(){
  const bookList=document.getElementById("bookList");
  bookList.textContent="";    //clears the bookList before adding/removing books each time - By clearing the content of the bookList element, you ensure that any previously rendered book cards are removed before adding the new book cards based on the updated myLibrary array. This prevents duplication and ensures that the display reflects the current state of the library.

  myLibrary.forEach( (book,index) => {    //each book & it's index from the array is traversed
    const bookCard=document.createElement("div");  //each book tile
    bookCard.classList.add("book-card");    //add book-card class to each book tile for css
    bookCard.dataset.index=index;          //add myLibrary array index to each book tile for js
    
    const bookTitle=document.createElement("h2");
    bookTitle.textContent=book.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor=document.createElement("p");
    bookAuthor.textContent=`Author: ${book.author}`;
    bookCard.appendChild(bookAuthor);

    const bookPages=document.createElement("p");
    bookPages.textContent=`Pages: ${book.pages}`;
    bookCard.appendChild(bookPages);

    const checkBox=document.createElement("input");   //readStatus
    checkBox.type="checkbox";
    const label=document.createElement("span");
    label.textContent="Read";
    if(book.readStatus){
      checkBox.checked=true;
      bookCard.classList.add("book-read");
    }
    const line=document.createElement("p"); 
    line.appendChild(label);
    line.appendChild(checkBox);
    bookCard.appendChild(line);
    line.id="readStatus";

    checkBox.addEventListener("change", () => {  //add class for css
      if (checkBox.checked) {    //change color if checkbox checked
        bookCard.classList.add("book-read");
      } else {
        bookCard.classList.remove("book-read");
      }
    });
    
    const removeBtn=document.createElement("button");
    removeBtn.textContent="Remove";
    removeBtn.onclick= ()=>removeBook(index);
    bookCard.appendChild(removeBtn);

    bookList.appendChild(bookCard);
  })
}

function removeBook(index){
  myLibrary.splice(index,1);
  displayBooks();
}


/* Dialog and Form handling --------- */

const dialog= document.getElementById("bookDialog");
const bookForm= document.getElementById("eachBookDetails");
const newBookBtn= document.getElementById("newBookBtn");
const cancelBtn= document.getElementById("cancelBtn");

newBookBtn.addEventListener( "click",() =>{
  dialog.showModal();
})

cancelBtn.addEventListener( "click",() =>{
  dialog.close();
  bookForm.reset();
})

bookForm.addEventListener( "submit",(e) =>{
  e.preventDefault();     //submit tries to send the data to a server by default. It prevents that.

  const title=document.getElementById("title").value;
  const author=document.getElementById("author").value;
  const pages=document.getElementById("pages").value;
  const readStatus=document.getElementById("status").checked;

  addBookToLibrary(title,author,pages,readStatus);
  displayBooks();

  bookForm.reset();
  dialog.close();
})


// Add some initial books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('Kaizen', 'Sarah Harvey', 389, false);

// Initial display
displayBooks();





