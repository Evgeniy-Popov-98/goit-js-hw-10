// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const buttonTimer = document.querySelector('button[data-start]');

let userSelectedDate;
let timeNow = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: timeNow,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < timeNow) {
      buttonTimer.setAttribute('disabled', '');
      iziToast.warning({
        title: 'Caution',
        message: 'Please choose a date in the future',
      });
    } else {
      buttonTimer.removeAttribute('disabled');
      buttonTimer.addEventListener('click', activeTimer);
    }
  },
};

flatpickr('#datetime-picker', options);

function activeTimer() {
  class Timer {
    constructor(tick) {
      this.tick = tick;
      this.isActive = false;
      this.lastTime = 0;
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
