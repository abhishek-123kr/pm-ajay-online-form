

const form = document.getElementById("applicationForm");
const messageBox = document.getElementById("messageBox");

const deployURL = "https://script.google.com/macros/s/AKfycbzk2FvaFp-1dOL2LoChJvwqtslrdHyP1I750zqbTg8BvQoMxnh8uy-dP65yMiKprUh8yg/exec";

function showMessage(text, type) {
  messageBox.className = "message-box";
  if (type) {
    messageBox.classList.add(type);
  }
  messageBox.textContent = text;
}

function clearErrors() {
  document.querySelectorAll(".error-field").forEach(el => {
    el.classList.remove("error-field");
  });
}

function highlightInvalidFields() {
  const fields = form.querySelectorAll("input, select");
  fields.forEach(field => {
    if (!field.checkValidity()) {
      field.classList.add("error-field");
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();

  if (!form.checkValidity()) {
    highlightInvalidFields();
    form.reportValidity();
    showMessage("कृपया सभी आवश्यक जानकारी भरें।", "error");
    return;
  }

  showMessage("डेटा सबमिट हो रहा है...", "info");

  const formData = new FormData(form);

  fetch(deployURL, {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(() => {
      showMessage("Application submitted successfully!", "success");
      form.reset();
    })
    .catch(error => {
      console.log(error);
      showMessage("Error submitting form", "error");
    });
});

form.querySelectorAll("input, select").forEach(field => {
  field.addEventListener("input", () => field.classList.remove("error-field"));
  field.addEventListener("change", () => field.classList.remove("error-field"));
});
