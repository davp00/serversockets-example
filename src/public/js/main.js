const socket            = io('http://localhost:3000');
const $dataTemperature  = document.getElementById('dataTemperature');
const $dataPlatform     = document.getElementById('dataPlatform');
const $dataCPUS         = document.getElementById('dataCPUS');


socket.on('data', ( data ) => 
{
    $dataTemperature.innerHTML  = data.temperature.toFixed(2);
    $dataPlatform.innerHTML     = data.platform;
    $dataCPUS.innerText         = data.cpus;
});