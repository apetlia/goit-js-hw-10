export function createCountryCardMarkup(data) {
  let { name, flags, capital, languages, population } = data[0];

  name = name.common;
  capital = capital[0];
  languages = Object.values(languages).join(', ');

  return `
    <div class="country-card">
      <div class="country-card__title">
        <img src="${flags.png}" alt="${flags.alt}" width="40" />
        <h2>${name}</h2>
      </div>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${languages}</p>
    </div>
    `;
}

export function createCountryListMarkup(data) {
  return data
    .map(({ name, flags }) => {
      return `
        <li class="country-list__item">
          <img src="${flags.png}" alt="${flags.alt}" width="30"/>
          ${name.common}
        </li>`;
    })
    .join('');
}
