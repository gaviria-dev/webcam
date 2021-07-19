'use strict';

const boton = document.getElementById('boton');
const instrucciones1 = document.getElementById('instrucciones-1');
const instrucciones2 = document.getElementById('instrucciones-2');

var state = {
    numeroPaso: 1,
}

boton.addEventListener('click', () => {
    switch (state.numeroPaso) {
        case 1:
            instrucciones1.style.display = 'none';
            state.numeroPaso++;
            break;
        
        case 2:
            instrucciones2.style.display = 'none';
            state.numeroPaso++;
            break;

        case 3:
            instrucciones3.style.display = 'none';
            state.numeroPaso++;
            break;
    
        default:
            break;
    }
}, false);