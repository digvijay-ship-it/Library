// to insert form in dom
let formDiv;

function addBookFormToDom() {
  formDiv = document.createElement("div");
  // const form = document.createElement("form");
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
}

// add event listener to add book Form button
document
  .querySelector("#addBookBtn")
  .addEventListener("click", addBookFormToDom);
