// // script.js
// const fileInput = document.getElementById("fileInput");
// const profileImage = document.getElementById("profileImage");
// fileInput.addEventListener("change", function () {
//   const file = fileInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       profileImage.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// });
document.querySelector("#toggler").addEventListener("click", function () {
  document.querySelectorAll(".list-mb").forEach((element) => {
    element.classList.toggle("activated");
  });
});

let form = document.getElementById("form");
let fNameInput = document.getElementById("fName");
let lNameInput = document.getElementById("lName");
let emailInput = document.getElementById("email");
let contactInput = document.getElementById("contact");
let passwordInput = document.getElementById("pswd");
let confirmPasswordInput = document.getElementById("confirm-pswd");
let confirmPswdError = document.getElementById("cofirmPswd-error");
let heading1 = document.getElementById("heading-first");
let heading2 = document.getElementById("heading-second");
document.getElementById("login").addEventListener("click", function () {
  form.style.display = "block";
});
document.getElementById("cross").addEventListener("click", function () {
  form.style.display = "none";
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (requirementChecked()) {
    const allObjValue = {
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      emai: emailInput.value,
      contact: contactInput,
      password: passwordInput,
    };
    heading1.textContent = allObjValue.firstName;
    heading2.textContent = allObjValue.lastName;
  }
});

function validateEmail() {
  let emailError = document.getElementById("email-error");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(emailInput.value)) {
    emailError.textContent = "";
    return true;
  } else {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }
}

function validatePassword() {
  let passwordError = document.getElementById("pswd-error");
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (passwordPattern.test(passwordInput.value)) {
    passwordError.textContent = "";
    return true;
  } else {
    passwordError.textContent =
      "Password must contain at least one lowercase letter, one uppercase letter, and be 8 characters or more.";
    return false;
  }
}

function requirementChecked() {
  let allFieldsFilled = [
    fNameInput,
    lNameInput,
    emailInput,
    contactInput,
    passwordInput,
    confirmPasswordInput,
  ].every((input) => input.value.trim() !== "");
  if (!allFieldsFilled) {
    alert("all filed are mandatory");
    return false;
  }
  if (!validateEmail() || !validatePassword()) {
    return false;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPswdError.textContent = "Passwords do not match.";
    return false;
  } else {
    confirmPswdError.textContent = "";
  }

  return true;
}
