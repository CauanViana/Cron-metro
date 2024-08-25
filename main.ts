const timerEl = document.getElementById('timer') as HTMLElement;
const marksList = document.getElementById('marks-list') as HTMLElement;

let intervalId: number = 0;
let timer: number = 0;
let marks: number[] = [];

const formatTime = (time: number): string => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const setTimer = (time: number): void => {
    timerEl.innerText = formatTime(time);
}

const addMarkToList = (markIndex: number, markTime: number): void => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const toggleTimer = (): void => {
    const button = document.getElementById('power') as HTMLElement;
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action === 'start' || action === 'continue') {
        intervalId = window.setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action === 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const markTime = (): void => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const resetTimer = (): void => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power') as HTMLElement;
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('power')?.addEventListener('click', toggleTimer);
document.getElementById('mark')?.addEventListener('click', markTime);
document.getElementById('reset')?.addEventListener('click', resetTimer);
