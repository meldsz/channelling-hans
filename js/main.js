//Data
var dataset = JSON.parse(localStorage.getItem('Data'));
var minYear = d3.min(dataset.map(data => +data.year));
var maxYear = d3.max(dataset.map(data => +data.year));
var displayYear = minYear;
var intervalId;
var selectedCountry = "";
var trace = false;

initialSvgSetup();

// slider to view data for a particular year
createSlider();

// create drop down to select country
createCountryDropdown();

initializeDataOnFocus();

generateVisualisation();

displayLegend();