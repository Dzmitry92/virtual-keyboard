// eslint-disable-next-line import/extensions
import keyboard from './src/data.js';

let currentLang = localStorage.getItem('lang') || 'en';
let cups = false;
const input = document.createElement('textarea');
const root = document.createElement('div');
const message = document.createElement('p');
root.id = 'root';
input.id = 'keyboard-input';
document.body.append(input);
document.body.append(root);
document.body.append(message);
message.innerHTML = 'Switch language: <span>ControlLeft + AltLeft</span>';
input.disabled = true;

// Creature DOM
keyboard.forEach((row) => {
  const rowWraper = document.createElement('div');
  row.forEach((buttonObj) => {
    const key = Object.keys(buttonObj)[0];
    const button = document.createElement('button');
    button.id = key;
    const [lower] = buttonObj[key][currentLang];
    button.setAttribute('uniqueAttribute', lower);
    button.classList.add('button');
    button.innerHTML = lower;
    rowWraper.appendChild(button);
  });
  root.appendChild(rowWraper);
});

// language switching
function switchLang() {
  if (currentLang === 'en') {
    currentLang = 'ru';
  } else {
    currentLang = 'en';
  }
  localStorage.setItem('lang', currentLang);
}

// Lowercase
function updateKeys() {
  keyboard.forEach((row) => {
    row.forEach((buttonObj) => {
      const key = Object.keys(buttonObj)[0];
      const button = document.getElementById(key);
      const [lower] = buttonObj[key][currentLang];
      button.setAttribute('uniqueAttribute', lower);
      button.innerHTML = lower;
    });
  });
}

// Uppercase
function shiftUpdateKeys() {
  keyboard.forEach((row) => {
    row.forEach((buttonObj) => {
      const key = Object.keys(buttonObj)[0];
      const button = document.getElementById(key);
      const [, upper] = buttonObj[key][currentLang];
      button.setAttribute('uniqueAttribute', upper);
      button.innerHTML = upper;
    });
  });
}

// Switching the state of the CapsLock button
function capsUpdateKeys() {
  if (cups === false) {
    shiftUpdateKeys();
    cups = true;
  } else {
    updateKeys();
    cups = false;
  }
}

// Add mouse events
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {

    // if Backspace / Delete mouse
    if (e.target.id === '8' || e.target.id === '46') {
      input.value = input.value.slice(0, input.value.length - 1);
      return;
    }

    // if Tab mouse
    if (e.target.id === '9') {
      input.value += '\t';
      return;
    }

    // if Enter mouse
    if (e.target.id === '13') {
      input.value += '\n';
      return;
    }

    // if Shift / Ctrl / Alt / Win mouse
    if (e.target.id === '16' || e.target.id === '91' || e.target.id === '18' || e.target.id === '17') {
      input.value += '';
      return;
    }

    // if CupsLock mouse
    if (e.target.id === '20') {
      const activeCaps = document.getElementById('20');
      if (cups === false) {
        shiftUpdateKeys();
        activeCaps.classList.add('etherColor');
        cups = true;
      } else {
        updateKeys();
        activeCaps.classList.remove('etherColor');
        cups = false;
      }
      input.value += '';
      return;
    }

    const value = e.target.getAttribute('uniqueAttribute');
    input.value += value;
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const clickButton = document.getElementById(e.target.id);
    if (e.target.id === '16') {
      shiftUpdateKeys();
    }

    clickButton.classList.add('pressed');
  }
});

document.addEventListener('mouseup', (e) => {
  const endPressed = document.querySelector('.pressed');
  if (endPressed === null) {
    return;
  }
  if (e.target.id === '16') {
    updateKeys();
  }
  endPressed.classList.remove('pressed');
});

// Add keyboard events
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const pressedButton = document.getElementById(e.keyCode);

  if (pressedButton !== null) {
    pressedButton.classList.add('pressed');

    // if Backspace / Delete keyboard
    if (e.keyCode === 8 || e.keyCode === 46) {
      input.value = input.value.slice(0, input.value.length - 1);
      return;
    }

    // if Tab keyboard
    if (e.keyCode === 9) {
      input.value += '\t';
      return;
    }

    // if Enter keyboard
    if (e.keyCode === 13) {
      input.value += '\n';
      return;
    }

    // if  Ctrl / Alt keyboard
    if (e.keyCode === 18 || e.keyCode === 17 || e.keyCode === 91) {
      input.value += '';
      return;
    }

    // if Shift keyboard
    if (e.keyCode === 16) {
      if (cups === false) {
        shiftUpdateKeys();
      } else {
        updateKeys();
      }
      input.value += '';
      return;
    }

    // if CupsLock keyboard
    if (e.keyCode === 20) {
      const activeCaps = document.getElementById('20');
      if (cups === false) {
        activeCaps.classList.add('otherColor');
      } else {
        activeCaps.classList.remove('otherColor');
      }
      input.value += '';
      return;
    }

    const value = pressedButton.getAttribute('uniqueAttribute');
    input.value += value;
  }
});

document.addEventListener('keyup', (e) => {
  const pressedButton = document.getElementById(e.keyCode);
  if (pressedButton !== null) {
    pressedButton.classList.remove('pressed');

    // if switchLang
    if (e.keyCode === 18 || e.keyCode === 17) {
      const ctrl = document.getElementById('17');
      const alt = document.getElementById('18');

      if ((e.keyCode === 18 && ctrl.className === 'button pressed') || (e.keyCode === 17 && alt.className === 'button pressed')) {
        if (cups) {
          switchLang();
          shiftUpdateKeys();
        } else {
          switchLang();
          updateKeys();
        }
      }
      return;
    }

    if (e.keyCode === 16) {
      if (cups === false) {
        updateKeys();
      } else {
        shiftUpdateKeys();
      }
      return;
    }

    if (e.keyCode === 20) {
      capsUpdateKeys();
    }
  }
});
