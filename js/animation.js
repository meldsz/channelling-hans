function displayYearlyData() {
    if (d3.select("#play").property("value") === "Play") {
        d3.select("#play").property("value", "Stop");
        intervalId = setInterval(() => {
            displayYear++;
            if (displayYear > maxYear) {
                displayYear = minYear;
            }
            generateVisualisation();
        }, 1000)
    }
    else {
        d3.select("#play").property("value", "Play");
        clearInterval(intervalId);
    }

}