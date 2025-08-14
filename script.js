// Element refs
const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");

const nameErr = document.getElementById("nameError");
const emailErr = document.getElementById("emailError");
const msgErr = document.getElementById("messageError");
const successMsg = document.getElementById("successMsg");

const card = document.querySelector(".contact-form");

// Basic email regex (balanced good UX + correctness)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Individual validators
function validateName() {
  const v = nameEl.value.trim();
  if (!v) {
    nameErr.textContent = "Name is required.";
    flipValidity(nameEl, false);
    return false;
  }
  nameErr.textContent = "";
  flipValidity(nameEl, true);
  return true;
}

function validateEmail() {
  const v = emailEl.value.trim();
  if (!v) {
    emailErr.textContent = "Email is required.";
    flipValidity(emailEl, false);
    return false;
  }
  if (!emailPattern.test(v)) {
    emailErr.textContent = "Enter a valid email address.";
    flipValidity(emailEl, false);
    return false;
  }
  emailErr.textContent = "";
  flipValidity(emailEl, true);
  return true;
}

function validateMessage() {
  const v = msgEl.value.trim();
  if (!v) {
    msgErr.textContent = "Message cannot be empty.";
    flipValidity(msgEl, false);
    return false;
  }
  msgErr.textContent = "";
  flipValidity(msgEl, true);
  return true;
}

// Helper: toggle valid/invalid classes
function flipValidity(input, ok) {
  input.classList.toggle("input-valid", ok);
  input.classList.toggle("input-invalid", !ok);
}

// Real-time validation (input and blur)
[nameEl, emailEl, msgEl].forEach((el) => {
  el.addEventListener("input", () => {
    successMsg.textContent = ""; // clear success when typing
    switch (el.id) {
      case "name": validateName(); break;
      case "email": validateEmail(); break;
      case "message": validateMessage(); break;
    }
  });
  el.addEventListener("blur", () => {
    switch (el.id) {
      case "name": validateName(); break;
      case "email": validateEmail(); break;
      case "message": validateMessage(); break;
    }
  });
});

// Submit handler with shake on invalid
form.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.textContent = "";

  const ok =
    validateName() &
    validateEmail() &
    validateMessage(); // bitwise OK here is fine (0/1), but keeps all validators running

  if (ok) {
    successMsg.textContent = "✅ Your message has been submitted successfully!";
    form.reset();
    [nameEl, emailEl, msgEl].forEach((el) => {
      el.classList.remove("input-valid", "input-invalid");
    });
  } else {
    // Trigger shake effect on the 3D card
    card.classList.remove("shake");
    // reflow to restart animation
    void card.offsetWidth;
    card.classList.add("shake");
  }
});
