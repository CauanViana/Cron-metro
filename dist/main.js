"use strict";
var _a, _b, _c;
const timerEl = document.getElementById('timer');
const marksList = document.getElementById('mark-list');
let intervalId = 0;
let timer = 0;
let marks = [];
const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
};
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
};
const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
};
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');
    clearInterval(intervalId);
    if (action === 'start' || action === 'continue') {
        intervalId = window.setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else if (action === 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};
const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
};
const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
};
(_a = document.getElementById('power')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toggleTimer);
(_b = document.getElementById('mark')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', markTime);
(_c = document.getElementById('reset')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', resetTimer);
