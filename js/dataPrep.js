const jsonArr = [];
d3.csv("./data/Processed_GCI_Data.csv")
    .then(function (d) {
        for (let i = 0; i < d3.keys(d).length - 1; i++) {
            const c = d[i].Country;
            const y = d[i].Year;
            const ci = d[i].Global_Competitiveness_Index;
            const p = d[i].Population;
            const gdp = d[i].GDP;
            const region = d[i]["Forum classification"];
            const pillars = [d[i]["1st_pillar_Institutions"], d[i]["2nd_pillar_Infrastructure"], d[i]["3rd_pillar_Macroeconomic_environment"], d[i]["4th_pillar_Health_and_primary_education"], d[i]["5th_pillar_Higher_education_and_training"], d[i]["6th_pillar_Goods_market_efficiency"], d[i]["7th_pillar_Labor_market_efficiency"], d[i]["8th_pillar_Financial_market_development"], d[i]["9th_pillar_Technological_readiness"], d[i]["10th_pillar_Market_size"], d[i]["11th_pillar_Business_sophistication_"], d[i]["12th_pillar_Innovation"]];
            const obj = {
                "Country": c,
                "year": y,
                "CompIndex": ci,
                "population": p,
                "gdp": gdp,
                "region": region,
                "pillars": pillars
            };
            jsonArr.push(obj)
        }
        localStorage.setItem('Data', JSON.stringify(jsonArr));
    }).catch(err => {
        console.log(err);
    });