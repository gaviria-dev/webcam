'use strict';

const videoElement = document.querySelector('#video');
const captureElement = document.querySelector('#capture');
const canvasScreen = document.querySelector('#screenshot');
const instrucciones1 = document.querySelector('#instrucciones1');
const instrucciones2 = document.querySelector('#instrucciones2');
const boton1 = document.querySelector('#btn1');
const boton2 = document.querySelector('#btn2');

var state = {
}

const constraints = {
  video: {
    facingMode: 'environment',
  }
};

const handleStream = (stream) => {
  videoElement.srcObject = stream;
  /*
  setInterval(() => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    //contexto.scale(2, 2);
    contexto.drawImage(videoElement, 0, 0);
  }, 1000 / 30);
  */
};

const startStream = async (constraints) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  }
  catch (err) {
    console.error(err);
  }
  
};

const doScreenshot = () => {

  canvasScreen.width = 500;
  canvasScreen.height = 889;
  let sH = videoElement.videoHeight;
  let sW = 0.5625*videoElement.videoHeight;
  let sX = (videoElement.videoWidth - sW) * 0.5;
  canvasScreen.getContext('2d').drawImage(videoElement, sX, 0, sW, sH, 0, 0, 500, 889);
  if (state.numPaso == 1) {
    state.dataImage1 = canvasScreen.toDataURL('image/jpg');
    instrucciones2.style.display = 'flex';
    //console.log('Foto tomada: ', data);
  }
  else if (state.numPaso == 2) {
    state.dataImage2 = canvasScreen.toDataURL('image/jpg');
  }
}

/////////////////////////////////////////////////////////////////////////////

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {

  console.log("El dispositivo es compatible!");
  startStream(constraints);

}

captureElement.addEventListener('click', doScreenshot, false);


boton1.addEventListener('click', ()=>{
  instrucciones1.style.display = 'none';
  state.numPaso = 1;
}, false);

boton2.addEventListener('click', ()=>{
  instrucciones2.style.display = 'none';
  state.numPaso = 2;
}, false);