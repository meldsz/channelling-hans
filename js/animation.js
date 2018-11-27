function displayYearlyData() {

    setInterval(() => {
        displayYear++;
        if (displayYear > maxYear) {
            displayYear = minYear;
        }
        generateVisualisation();
    },1000)
}