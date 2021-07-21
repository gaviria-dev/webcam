'use strict';

// Obtener elementos del DOM
const boton = document.getElementById('boton');
const botonCamara = document.getElementById('boton-camara');
const camara = document.getElementById('camera');
const botonTexto = document.getElementById('boton-texto');
const instrucciones1 = document.getElementById('instrucciones-1');
const instrucciones2 = document.getElementById('instrucciones-2');
const instrucciones3 = document.getElementById('instrucciones-3');
const instrucciones4 = document.getElementById('instrucciones-4');
const instrucciones5 = document.getElementById('instrucciones-5');
const instrucciones6 = document.getElementById('instrucciones-6');
const photo1 = document.createElement("img");
const photo2 = document.createElement("img");
const canvas = document.createElement("canvas");

canvas.width = 500;
canvas.height = 889;
// Crear un objeto que guarde informacion sobre el estado actual
var state = {
    numeroPaso: 1,
}

// Funcion de encriptado de imagenes en Base 64
const getBase64FromFile = (img, callback) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
        callback(fileReader.result);
    }
    fileReader.readAsDataURL(img);
};

// Funcion de preprocesado de imagen
const preprocess = (photo) => {
    let sH = photo.height;
    let sW = 0.5625*photo.height;
    let sX = (photo.width - sW) * 0.5;
    canvas.getContext('2d').drawImage(photo, sX, 0, sW, sH, 0, 0, 500, 889);
    return canvas.toDataURL('image/jpg');
}

// Evento de Click en boton de instrucciones
boton.addEventListener('click', () => {
    switch (state.numeroPaso) {
        case 1:
            instrucciones1.style.display = 'none';
            instrucciones2.style.display = 'flex';
            botonTexto.innerHTML = 'Comenzar';
            state.numeroPaso++;
            break;
        
        case 2:
            instrucciones2.style.display = 'none';
            instrucciones3.style.display = 'flex';
            boton.style.display = 'none';
            botonCamara.style.display = 'flex';

            //botonTexto.innerHTML = 'Tomar foto';
            state.numeroPaso++;
            break;
    
        default:
            break;
    }
}, false);

// Evento de cambio en Boton Tomar Foto
camara.addEventListener('change', (image) => {
    switch (state.numeroPaso) {
        case 3:
            getBase64FromFile(image.target.files[0], (photoBase64) => {
                photo1.src = photoBase64;
                let base64 = preprocess(photo1);
                state.geometry = base64.split(',')[1];
                instrucciones3.style.display = 'none';
                instrucciones4.style.display = 'flex';
                state.numeroPaso++;
            });
            break;
        
        case 4:
            getBase64FromFile(image.target.files[0], (photoBase64) => {
                photo2.src = photoBase64;
                let base64 = preprocess(photo2);
                console.log(base64);
                state.sanitary = base64.split(',')[1];
                botonCamara.style.display = 'none';
                instrucciones4.style.display = 'none';
                instrucciones5.style.display = 'flex';
                // { geometry: state.geometry, sanitary: base64.split(',')[1]}
                // { geometry: "blablabla", sanitary: "blobloblo" }
                postData('https://vqg2xe8sgk.execute-api.sa-east-1.amazonaws.com/Production', { geometry: state.geometry, sanitary: state.sanitary } )
                    .then(data => {
                        console.log(data.body);
                        instrucciones5.style.display = 'none';
                        instrucciones6.style.display = 'flex';
                        state.numeroPaso++;
                    });
            });
    
        default:
            break;
    }
}, false);

// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);
    return response.json(); // parses JSON response into native JavaScript objects
}