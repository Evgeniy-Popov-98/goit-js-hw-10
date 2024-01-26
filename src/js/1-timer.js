// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputTimer = document.querySelector('#datetime-picker');
const buttonTimer = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < options.defaultDate) {
      buttonTimer.setAttribute('disabled', '');
      buttonTimer.setAttribute(
        'style',
        'background-color: #CFCFCF; color: #989898;'
      );

      iziToast.error({
        message: 'Please choose a date in the future',
      });
    } else {
      buttonTimer.removeAttribute('disabled');
      buttonTimer.removeAttribute('style');
      buttonTimer.addEventListener('click', activeTimer);
    }
  },
};

flatpickr('#datetime-picker', options);

function activeTimer() {
  inputTimer.setAttribute('disabled', '');
  buttonTimer.setAttribute('disabled', '');
  buttonTimer.setAttribute(
    'style',
    'background-color: #CFCFCF; color: #989898;'
  );
  let diffTime = userSelectedDate - options.defaultDate;
  const secondInterval = setInterval(() => {
    if (diffTime > 0) {
      let newTimer = convertMs(diffTime);

      days.textContent = `${addZero(newTimer.days)}`;
      hours.textContent = `${addZero(newTimer.hours)}`;
      minutes.textContent = `${addZero(newTimer.minutes)}`;
      seconds.textContent = `${addZero(newTimer.seconds)}`;

      diffTime -= 1000;
    } else {
      clearInterval(secondInterval);
    }
  }, 1000);
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

function addZero(num) {
  return num.toString().padStart(2, '0');
}
