import './css/styles.css';
import refs from './refs';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCountryCardMarkup, createCountryListMarkup } from './templates';

const DEBOUNCE_DELAY = 500;

refs.searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  let userInput = evt.target.value.trim();

  clearCountyListAndInfo();

  if (!userInput) {
    return;
  }

  fetchCountries(userInput).then(renderCountriesHtml).catch(NotifyError);
}

function renderCountriesHtml(data) {
  if (data.length === 1) {
    refs.countyInfo.innerHTML = createCountryCardMarkup(data);
  } else if (data.length > 10) {
    NotifyTooManyCountries();
  } else {
    refs.countyList.innerHTML = createCountryListMarkup(data);
  }
}

function clearCountyListAndInfo() {
  refs.countyInfo.innerHTML = '';
  refs.countyList.innerHTML = '';
}

function NotifyError(err) {
  if (err.message === '404') {
    Notify.failure('Oops, there is no country with that name');
  } else {
    Notify.failure(err.message);
  }
}

function NotifyTooManyCountries() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
