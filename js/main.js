let countries;

let btnToggleDarkMode = document.querySelector("#btn-toggle-dark-mode");


let inputSearch = document.querySelector("#input-field-country");
inputSearch.addEventListener("input", function (event) {

  document.querySelector("#countries-selection-box").innerHTML = "";

  countries.forEach((c) => {
    if (c.name.official.includes(inputSearch.value)) {
      const country = document.createElement("div");
      country.classList.add("country-info-box");

      country.innerHTML = `
    <img src="${c.flags.png}">
    <h2>${c.name.official}</h2>
    <p>Population: ${c.population}</p>
    <p>Region: ${c.region}</p>`;

      document.querySelector("#countries-selection-box").appendChild(country);
    }
  });
});

async function getAllCountries() {

  const response = await fetch("https://restcountries.com/v3.1/all ");
  countries = await response.json();

  console.log(
    "Paises con mas de un continente: ",
    countries.find((c) => !c.capital)
  );

  countries.forEach((c) => {
    const country = document.createElement("div");
    country.classList.add("country-info-box");
    country.innerHTML = `
    <img src="${c.flags.png}">
    <h2>${c.name.official}</h2>
    <p>Population: ${c.population}</p>
    <p>Region: ${c.region}</p>`;

    document.querySelector("#countries-selection-box").appendChild(country);
  });
}

function toggleDarkMode() {
  document.querySelector("html").classList.toggle("dark-mode");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon");
  btnToggleDarkMode.children[0].classList.toggle("bi-moon-fill");
}

function init() {
  btnToggleDarkMode.addEventListener("click", toggleDarkMode);
  getAllCountries();
}

window.onload = init();