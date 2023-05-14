"use strict";

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }
}

// to insert form in dom
let formDiv;

// to collect book obj
const myLibrary = [];

function removeBookFromLibraryAndDom(event) {
  // remove from myLibrary
  myLibrary.splice(event.target.id, 1);

  // remove from Dom
  event.target.parentNode.remove();
}

function toggleReadStatus(event) {
  const tempEvent = event;
  const numberOfObjInArr = event.target.id.slice(16);

  // change value in object
  myLibrary[numberOfObjInArr].read = !myLibrary[numberOfObjInArr].read;
  // change value in dom
  tempEvent.target.innerText = myLibrary[numberOfObjInArr].read
    ? "Read"
    : "Not read";
  tempEvent.target.classList.toggle("read");
}

function printAllBooks(bookArr) {
  const bookListDiv = document.querySelector("#bookList");
  bookListDiv.innerText = "";

  for (let i = 0; i < bookArr.length; i += 1) {
    // insert all element one by one
    const bookReadStatus = document.createElement("button");
    // adding number at last to use id's last index for button manipulation
    bookReadStatus.id = `readStatusChange${i}`;
    bookReadStatus.innerText = bookArr[i].read ? "Read" : "Not read";

    // not-read addition is default
    bookReadStatus.classList.add("not-read");
    // read class addition only to toggle css property
    bookReadStatus.classList.add(bookArr[i].read ? "read" : "not-read");
    const singleBookDiv = document.createElement("div");
    singleBookDiv.classList.add("bookDiv");
    singleBookDiv.innerHTML = `
      <p>${bookArr[i].title}</p>
      <p>${bookArr[i].author}</p>
      <p>${bookArr[i].pages}</p>
      `;
    singleBookDiv.appendChild(bookReadStatus); // Append bookReadStatus to singleBookDiv
    singleBookDiv.innerHTML += `<button class="removeBookBtn" id="${i}">Remove</button>`;

    bookListDiv.appendChild(singleBookDiv);

    // to remove book
    document
      .getElementById(`${i}`)
      .addEventListener("click", removeBookFromLibraryAndDom);
    // // to change book status
    document
      .querySelector(`#readStatusChange${i}`)
      .addEventListener("click", toggleReadStatus);
  }
}

function addBookToLibrary(event) {
  // check if all fields are valid
  const bookTitle = document.querySelector("#book-name");
  const authorOfBook = document.querySelector("#author");
  const totalPages = document.querySelector("#page-number");
  if (
    bookTitle.checkValidity() &&
    authorOfBook.checkValidity() &&
    totalPages.checkValidity()
  ) {
    event.preventDefault();

    const bookReadStatus = document.querySelector("#had-read").checked;

    const newBookObj = new Book(
      bookTitle.value,
      authorOfBook.value,
      totalPages.value
    );
    newBookObj.read = bookReadStatus;

    myLibrary.push(newBookObj);

    // destroy previous from
    formDiv.remove();

    // show all books
    printAllBooks(myLibrary);
  }
}
function addBookFormToDom() {
  formDiv = document.createElement("div");
  formDiv.id = "formDiv";
  formDiv.style.gridRow = "1/-1";
  formDiv.style.gridColumn = "1/-1";
  formDiv.innerHTML = `
          <form action="" id="form">
        <fieldset>
        <legend>Book details</legend>
      
        <label for="book-name">Name of Book:</label>
        <input type="text" id="book-name" minlength="3" required />
      
        <label for="author">Author:</label>
        <input type="text" id="author" minlength="3" required />
      
        <label for="page-number">Page Number:</label>
        <input type="number" id="page-number" min="1" max="10000" oninvalid="setCustomValidity('Enter book pages from 1 - 10000.')" required/>
      
        <div id="checkDiv">
        <label for="had-read">Have you read it:  </label>
          <input type="checkbox" id="had-read"/>
        </div>
        
        <div id="buttonDiv">
        <button id = "btnSubmit" type="button" >Submit</button>
        <button type="button" id="close-form-btn">Close</button>
        </div>
        </fieldset>
          </form>`;
  const contentDiv = document.querySelector(".content");
  contentDiv.appendChild(formDiv);

  // to submit
  document
    .querySelector("#btnSubmit")
    .addEventListener("click", addBookToLibrary);
  // to remove form
  document.querySelector("#close-form-btn").addEventListener("click", () => {
    formDiv.remove();
  });
}

// add event listener to add book Form button
document
  .querySelector("#addBookBtn")
  .addEventListener("click", addBookFormToDom);
