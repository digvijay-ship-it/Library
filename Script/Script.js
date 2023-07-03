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
  formDiv.append(createFormDiv());
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

function createFormDiv() {
  // Create form element
  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("id", "form");
  form.noValidate = true;

  // Create fieldset element
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Book details";
  fieldset.appendChild(legend);

  // Create input elements
  const label1 = document.createElement("label");
  const input1 = document.createElement("input");
  label1.setAttribute("for", "book-name");
  label1.textContent = "Name of Book:";
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "book-name");
  input1.setAttribute("minlength", "5");
  input1.setAttribute("pattern", "^[A-Za-z]{5,}$");
  input1.required = true;

  const label2 = document.createElement("label");
  const input2 = document.createElement("input");
  label2.setAttribute("for", "author");
  label2.textContent = "Author:";
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "author");
  input2.setAttribute("minlength", "5");
  input2.setAttribute("pattern", "^[A-Za-z]{5,}$");
  input2.required = true;

  const label3 = document.createElement("label");
  const input3 = document.createElement("input");
  label3.setAttribute("for", "page-number");
  label3.textContent = "Page Number:";
  input3.setAttribute("type", "number");
  input3.setAttribute("id", "page-number");
  input3.setAttribute("min", "50");
  input3.setAttribute("max", "10000");
  input3.required = true;

  // Create checkbox element
  const checkDiv = document.createElement("div");
  const label4 = document.createElement("label");
  const input4 = document.createElement("input");
  checkDiv.setAttribute("id", "checkDiv");
  label4.setAttribute("for", "had-read");
  label4.textContent = "Have you read it:";
  input4.setAttribute("type", "checkbox");
  input4.setAttribute("id", "had-read");

  checkDiv.appendChild(label4);
  checkDiv.appendChild(input4);

  // Create button elements
  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "buttonDiv");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "btnSubmit");
  submitButton.setAttribute("type", "button");
  submitButton.textContent = "Submit";
  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("id", "close-form-btn");
  closeButton.textContent = "Close";

  buttonDiv.appendChild(submitButton);
  buttonDiv.appendChild(closeButton);

  // Append elements to form
  fieldset.appendChild(label1);
  fieldset.appendChild(input1);
  fieldset.appendChild(label2);
  fieldset.appendChild(input2);
  fieldset.appendChild(label3);
  fieldset.appendChild(input3);
  fieldset.appendChild(checkDiv);
  fieldset.appendChild(buttonDiv);
  form.appendChild(fieldset);

  //
  input1.addEventListener("input", () => {
    console.log(input1.validity.tooShort);
    if (input1.validity.tooShort) {
      input1.setCustomValidity("Minimum length Of Book name is 5");
    } else if (input1.validity.patternMismatch) {
      input1.setCustomValidity("Name can be made of letters like A-Z or a-z");
    } else {
      input1.setCustomValidity("");
    }
    input1.reportValidity();
  });

  //
  input2.addEventListener("input", () => {
    if (input2.validity.tooShort) {
      input2.setCustomValidity("Minimum length Of Author name is 5");
    } else if (input2.validity.patternMismatch) {
      input2.setCustomValidity(
        "Name of Author can be made of letters like A-Z or a-z"
      );
    } else {
      input2.setCustomValidity("");
    }
    input2.reportValidity();
  });
  //
  input3.addEventListener("input", () => {
    if (input3.validity.rangeUnderflow) {
      input3.setCustomValidity("Book should have at least 50 pages");
    } else if (input3.validity.rangeOverflow) {
      input3.setCustomValidity("Book can have at max 10000 pages");
    } else {
      input3.setCustomValidity("");
    }
    input3.reportValidity();
  });
  //

  submitButton.addEventListener("click", (event) => {
    if (!input1.checkValidity()) {
      event.preventDefault();
      if (input1.validity.tooShort) {
        input1.setCustomValidity("Minimum length Of Book name is 5");
      } else if (input1.validity.patternMismatch) {
        input1.setCustomValidity(
          "Name can only be made of letters like A-Z or a-z"
        );
      } else {
        input1.setCustomValidity("");
      }
    }

    if (!input2.checkValidity()) {
      event.preventDefault();
      if (input2.validity.tooShort) {
        input2.setCustomValidity("Minimum length Of Author name is 5");
      } else if (input2.validity.patternMismatch) {
        input2.setCustomValidity(
          "Name of Author can be made of letters like A-Z or a-z"
        );
      } else {
        input2.setCustomValidity("");
      }
    }

    if (!input3.checkValidity()) {
      event.preventDefault();
      if (input3.validity.rangeUnderflow) {
        input3.setCustomValidity("Book should have at least 50 pages");
      } else if (input3.validity.rangeOverflow) {
        input3.setCustomValidity("Book can have at max 10000 pages");
      } else {
        input3.setCustomValidity("");
      }
    }

    // Trigger validation and display error messages
    input1.reportValidity();
    input2.reportValidity();
    input3.reportValidity();
  });

  // Append form to the document body
  return form;
}
