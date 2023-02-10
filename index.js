const myPicker = document.getElementById("input");
// Shades color example
const firstDark = document.querySelector(".first-dark");
const secondDark = document.querySelector(".second-dark");
const thirdDark = document.querySelector(".third-dark");
const fourthDark = document.querySelector(".fourth-dark");

// shades color name
const dark1 = document.querySelector(".first-shade");
const dark2 = document.querySelector(".second-shade");
const dark3 = document.querySelector(".third-shade");
const dark4 = document.querySelector(".fourth-shade");

// tints color example
const firstLight = document.querySelector(".first-light");
const secondLight = document.querySelector(".second-light");
const thirdLight = document.querySelector(".third-light");
const fourthLight = document.querySelector(".fourth-light");

// tints color name
const light1 = document.querySelector(".first-tint");
const light2 = document.querySelector(".second-tint");
const light3 = document.querySelector(".third-tint");
const light4 = document.querySelector(".fourth-tint");

let shades = [];
let tints = [];
let q = 0;
let firstShade, secondShade, thirdShade, fourthShade;
let firstTint, secondTint, thirdTint, fourthTint;

let componentToHex = function (c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

let rgbToHex = function (r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const calcShade = function ({ r, g, b }) {
  q = 0.9;
  for (let i = 1; i < 5; i++) {
    let red = Math.trunc(r * q);
    let green = Math.trunc(g * q);
    let blue = Math.trunc(b * q);
    let color = [red, green, blue];

    let final = rgbToHex(...color);
    shades.push(final);

    q -= 0.1;
  }

  return shades;
};

const calcTints = function ({ r, g, b }) {
  q = 0.1;
  for (let i = 1; i < 5; i++) {
    let red = Math.trunc(r + (255 - r) * q);
    let green = Math.trunc(g + (255 - g) * q);
    let blue = Math.trunc(b + (255 - b) * q);
    let color = [red, green, blue];

    let final = rgbToHex(...color);

    tints.push(final);
    q += 0.1;
  }

  return tints;
};

const hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const handleTransform = function (e) {
  const val = e.target.value;
  const toRgb = hexToRgb(val);

  shades = [];
  tints = [];
  calcShade(toRgb);
  calcTints(toRgb);

  [firstShade, secondShade, thirdShade, fourthShade] = shades;
  [firstTint, secondTint, thirdTint, fourthTint] = tints;

  //shades containers backgrounds
  firstDark.style.backgroundColor = firstShade;
  secondDark.style.backgroundColor = secondShade;
  thirdDark.style.backgroundColor = thirdShade;
  fourthDark.style.backgroundColor = fourthShade;

  //shades name
  dark1.textContent = firstShade;
  dark2.textContent = secondShade;
  dark3.textContent = thirdShade;
  dark4.textContent = fourthShade;

  // tints background
  firstLight.style.backgroundColor = firstTint;
  secondLight.style.backgroundColor = secondTint;
  thirdLight.style.backgroundColor = thirdTint;
  fourthLight.style.backgroundColor = fourthTint;

  // tints name
  light1.textContent = firstTint;
  light2.textContent = secondTint;
  light3.textContent = thirdTint;
  light4.textContent = fourthTint;
};

myPicker.addEventListener("change", handleTransform);
