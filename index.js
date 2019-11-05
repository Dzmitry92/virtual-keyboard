const keyboard = [
    [   
        {
            '192':   {
                en: '`',
                ru: 'ё',
            }
        },
        {
            '48':   {
                en: '0',
                ru: '0',
            }
        },

        {
            '49':   {
                en: '1',
                ru: '1',
            }
        },

        {
            '50':   {
                en: '2',
                ru: '2',
            }
        },

        {
            '8':   {
                en: 'backspace',
                ru: 'backspace',
            }
        },        
    ],
]

let currentLang = 'en';

const root = document.getElementById('root');

const input = document.createElement('textarea');

input.id = 'keyboard-input';
input.disabled = true;
document.body.appendChild(input);

root.addEventListener('click', function(e) {
    
    if (e.target.tagName === 'BUTTON') {
        const value = e.target.getAttribute('fff');
        input.value += value;
    }
});

document.addEventListener('keydown', function(e) {
    
    console.log(e.keyCode);

    const pressedButton = document.getElementById(e.keyCode);

    if (pressedButton !== null) {
        pressedButton.classList.add('pressed');

        if (e.keyCode === 8) {
            input.value = input.value.slice(0, input.value.length - 1);
        } else {
            const value = pressedButton.getAttribute('fff');
            input.value += value;
        }
    
    }
});

document.addEventListener('keyup', function(e) {
    const pressedButton = document.getElementById(e.keyCode);
    if (pressedButton !== null) {
        pressedButton.classList.remove('pressed');
    }
});
   

keyboard.forEach(function(row) {
    row.forEach(function(buttonObj) {
        const key = Object.keys(buttonObj)[0];
        const button = document.createElement('button');
        button.id = key;
        button.setAttribute('fff', buttonObj[key][currentLang]);
        button.classList.add('button');
        button.innerHTML = buttonObj[key][currentLang];
        root.appendChild(button);
    });
})