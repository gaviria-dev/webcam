'use strict';

const videoElement = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const canvasScreen = document.querySelector('#screenshot');
const buttonElement = document.getElementById('startbutton');

var contexto = canvas.getContext('2d');

const constraints = {
  video: {
    width: 240,
    height: 426,
  }
};

const constraints2 = {
  video: {
    width: 500,
    height: 889,
  }
};

const handleStream = (stream) => {
  videoElement.srcObject = stream;
  setInterval(() => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    //contexto.scale(2, 2);
    contexto.drawImage(videoElement, 0, 0);
  }, 1000 / 30);
};

const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const streamFoto = await navigator.mediaDevices.getUserMedia(constraints2);
  handleStream(stream);
};

const doScreenshot = () => {
  canvasScreen.width = videoElement.videoWidth;
  canvasScreen.height = videoElement.videoHeight;
  canvasScreen.getContext('2d').drawImage(videoElement, 0, 0);
  var data = canvasScreen.toDataURL('image/jpg');
  console.log('Foto tomada: ', data);
}

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  console.log("Let's get this party started");
  startStream(constraints);
}

buttonElement.addEventListener('click', doScreenshot, false);
