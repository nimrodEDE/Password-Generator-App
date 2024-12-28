const slider = document.querySelector('input[type="range"]');
const special = document.getElementById("special");
const strengthCheckers = document.querySelectorAll("li");
const [hasUpper, hasLower, hasNumbers, hasSymbols] = strengthCheckers;
const blocks = document.querySelectorAll(".block");
const rating = document.querySelector("#rating");
const button = document.querySelector("button");
const newPassword = document.querySelector(".password");
const copyBtn = document.querySelector("#copyBtn");
let strength = 3;

const getPass = (password) => {
  newPassword.style.color = "var(--color-light-gray)";
  newPassword.innerHTML = "";
  newPassword.innerHTML += password;
};

const generate = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const symbols = "~!@#$%^&*()_-+={[}]|:;'<,>.?/";

  let available = "";
  if (hasUpper.value) available += upper;
  if (hasLower.value) available += lower;
  if (hasNumbers.value) available += nums;
  if (hasSymbols.value) available += symbols;

  let password = "";
  for (let i = 0; i < slider.value; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    password += available[randomIndex];
  }

  if (available.length != 0) getPass(password);
};

const checkBox = () => {
  strength = 0;
  rating.innerHTML = "";
  strengthCheckers.forEach((checker) => {
    if (checker.value === 1) {
      strength++;
    }
  });

  const thresholds = [2, 5, 7, 10];
  thresholds.forEach((threshold) => {
    if (slider.value < threshold) {
      strength--;
    }
  });

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].classList.remove("pressed");
  }

  for (let i = 0; i < strength; i++) {
    blocks[i].classList.add("pressed");
  }

  const ratings = ["weak", "fair", "medium", "strong"];
  rating.innerHTML += `${ratings[strength - 1] || "bad"}`;
};

//update checkboxes

strengthCheckers.forEach((element) => {
  element.addEventListener("input", () => {
    if (!element.value) element.value = 1;
    else element.value = 0;
    checkBox();
  });
});

//update slider

const toggleSlider = () => {
  const value = slider.value;
  const max = slider.max;
  const percentage = (value / max) * 100;

  slider.style.background = `linear-gradient(
      to right,
      var(--color-mint-green) ${percentage}%,
      var(--color-dark-blue) ${percentage}%
    )`;
  special.innerHTML = "";
  special.innerHTML += value;
};

slider.addEventListener("input", (e) => {
  toggleSlider();
  checkBox();
});

button.addEventListener("click", () => {
  generate();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(newPassword.innerHTML)
    .then(() => {
      alert("Copied!");
    })
    .catch((err) => {
      console.log(err);
    });
});
