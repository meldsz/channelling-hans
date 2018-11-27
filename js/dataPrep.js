const jsonArr = [];
d3.csv("./data/GCI_CompleteData4.csv")
    .then(function (d) {
        for (let i = 0; i < d3.keys(d).length - 1; i++) {
            const c = d[i].Country;
            const y = d[i].Year;
            const ci = d[i].Global_Competitiveness_Index;
            const p = d[i].Population;
            const gdp = d[i].GDP;
            const region = d[i]["Forum classification"];
            const obj = {
                "Country": c,
                "year": y,
                "CompIndex": ci,
                "population": p,
                "gdp": gdp,
                "region": region
            };
            jsonArr.push(obj)
        }
        localStorage.setItem('Data', JSON.stringify(jsonArr));
    }).catch(err => {
    console.log(err);
});