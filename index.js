'use strict';

const videoElement = document.querySelector('#video');
const captureElement = document.querySelector('#capture');
const canvasScreen = document.querySelector('#screenshot');
var foto1 = document.querySelector('#foto1');
var foto1 = document.querySelector('#foto2');


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
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //const streamFoto = await navigator.mediaDevices.getUserMedia(constraints2);
  handleStream(stream);
};

const doScreenshot = () => {
  canvasScreen.width = 500;
  canvasScreen.height = 889;
  let sH = videoElement.videoHeight;
  let sW = 0.5625*videoElement.videoHeight;
  let sX = (videoElement.videoWidth - sW) * 0.5;
  canvasScreen.getContext('2d').drawImage(videoElement, sX, 0, sW, sH, 0, 0, 500, 889);
  var data = canvasScreen.toDataURL('image/jpg');
  console.log('Foto tomada: ', data);
}

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  console.log("Let's get this party started");
  startStream(constraints);
}

captureElement.addEventListener('click', doScreenshot, false);