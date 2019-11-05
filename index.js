const keyboard = [
    [   
        {
            '192':   {
                en: '`',
                ru: 'ё',
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
            '51':   {
                en: '3',
                ru: '3',
            }
        },

        {
            '52':   {
                en: '4',
                ru: '4',
            }
        },

        {
            '53':   {
                en: '5',
                ru: '5',
            }
        },

        {
            '54':   {
                en: '6',
                ru: '6',
            }
        },

        {
            '55':   {
                en: '7',
                ru: '7',
            }
        },

        {
            '56':   {
                en: '8',
                ru: '8',
            }
        },

        {
            '57':   {
                en: '9',
                ru: '9',
            }
        },

        {
            '48':   {
                en: '0',
                ru: '0',
            }
        },

        {
            '189':   {
                en: '-',
                ru: '-',
            }
        },

        {
            '187':   {
                en: '=',
                ru: '=',
            }
        },

        {
            '8':   {
                en: 'backspace',
                ru: 'backspace',
            }
        },        
    ],

    [
        {
            '9':   {
                en: 'tab',
                ru: 'tab',
            }
        },

        {
            '81':   {
                en: 'q',
                ru: 'й',
            }
        },

        {
            '87':   {
                en: 'w',
                ru: 'ц',
            }
        },

        {
            '69':   {
                en: 'e',
                ru: 'у',
            }
        },

        {
            '82':   {
                en: 'r',
                ru: 'к',
            }
        },

        {
            '84':   {
                en: 't',
                ru: 'е',
            }
        },

        {
            '89':   {
                en: 'y',
                ru: 'н',
            }
        },

        {
            '85':   {
                en: 'u',
                ru: 'г',
            }
        },

        {
            '73':   {
                en: 'i',
                ru: 'ш',
            }
        },

        {
            '79':   {
                en: 'o',
                ru: 'щ',
            }
        },

        {
            '80':   {
                en: 'p',
                ru: 'з',
            }
        },

        {
            '219':   {
                en: '[',
                ru: 'х',
            }
        },

        {
            '221':   {
                en: ']',
                ru: 'ъ',
            }
        },

        {
            '13':   {
                other: 'Enter',
                en: ' \n',
                ru: ' \n',
            }
        },
    ],

    [
        {
        '20':   {
            en: 'CapsLock',
            ru: 'CapsLock',
            }
        },
        {
            '65':   {
                en: 'a',
                ru: 'ф',
            }
        },
        {
            '83':   {
                en: 's',
                ru: 'ы',
            }
        },
        {
            '68':   {
                en: 'd',
                ru: 'в',
            }
        },
        {
            '70':   {
                en: 'f',
                ru: 'а',
            }
        },
        {
            '71':   {
                en: 'g',
                ru: 'п',
            }
        },
        {
            '72':   {
                en: 'h',
                ru: 'р',
            }
        },
        {
            '74':   {
                en: 'j',
                ru: 'о',
            }
        },
        {
            '75':   {
                en: 'k',
                ru: 'л',
            }
        },
        {
            '76':   {
                en: 'l',
                ru: 'д',
            }
        },
        {
            '186':   {
                en: ';',
                ru: 'ж',
            }
        },
        {
            '222':   {
                en: '"',
                ru: 'э',
            }
        },
        {
            '220':   {
                en: "",
                ru: '',
            }
        },
    ]
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
    const rowWraper= document.createElement('div');


    row.forEach(function(buttonObj) {
        const key = Object.keys(buttonObj)[0];
        const button = document.createElement('button');
        button.id = key;
        button.setAttribute('fff', buttonObj[key][currentLang]);
        button.classList.add('button');
        button.innerHTML = buttonObj[key][currentLang];
        rowWraper.appendChild(button);
    });
    root.appendChild(rowWraper);

});