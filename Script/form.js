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
module.exports = createFormDiv;
