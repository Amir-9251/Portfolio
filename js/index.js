// script.js
const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      profileImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
