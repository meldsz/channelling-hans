function displayYearlyData() {
    if (document.getElementById("play").value==="Play"){
        document.getElementById("play").value="Stop";
        intervalId = setInterval(() => {
            displayYear++;
            if (displayYear > maxYear) {
                displayYear = minYear;
            }
            generateVisualisation();
        }, 1000)
    }
    else
    {
        document.getElementById("play").value="Play";
        clearInterval(intervalId);
    }
    
}