var jsonArr = []
var csvdata = d3.csv("./data/GCI_CompleteData2.csv")
    .then(function (d) {
        for (var i = 0; i < d3.keys(d).length-1; i++) {
            var c = d[i].Country
            var y = d[i].Year
            var ci= d[i].Global_Competitiveness_Index
            var p = d[i].Population
            var gdp = d[i].GDP
            var region = d[i]["Forum classification"]
                var obj = {
                    "Country": c,
                    "year": y,
                    "CompIndex": ci,
                    "population": p,
                    "gdp": gdp,
                    "region": region
                }
                jsonArr.push(obj)
        }
        localStorage.setItem('Data',JSON.stringify(jsonArr));
    })