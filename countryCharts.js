let csvPath = "/Resources/Past 10 Years/5f7abe17-be9b-4011-940d-2af69fe8ccb7_Data.csv";

d3.csv(csvPath).then(data => console.log(data));

function init() {

    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    // Fetch the csv data
    d3.csv(csvPath).then((data) => {    

        // name loop
        for(var i=0; i < data.length; i++){
            //console.log(data[i]["Country Name"]),
            dropdown.append("option").text(data[i]["Country Name"]).property("value", data[i]["Country Name"]);
        };

        // get the first object and assign to variable
        let first = data[0]["Country Name"];

        console.log(first);
        
        // Call the functions to make each chart
        bar(first);
        countryBar(first);
        demographics(first);
    });
}

// function to display world bar graph
function bar(selection) {
    // Fetch the JSON data
    d3.csv(csvPath).then((data) => {

        // array of sample objects
        pop = [];
        country = [];

        for(var i=0; i < data.length-1 ; i++){
            yearpop = data[i]["2022"],
            countryName = data[i]["Country Name"],
            country.push(countryName),
            pop.push(yearpop)
            
        };
        console.log(pop);

        // Trace 
        let trace = [{
            x: country,
            y: pop,
            type: "bar",            
        }];

        let layout = {
            title: {text: "<b>World 2022 Population by Country</b>",
                        font: {family: "helvetica",
                                size: 30}},
            xaxis: {tickangle: -45,
                showticklabels: true,
                type: 'category'
            }
        };
            
        // plot bar chart
        Plotly.newPlot("bar", trace, layout);
    });
}

// function to display country bar graph
function countryBar(selection) {
    // Fetch the CSV data
    d3.csv(csvPath).then((data) => {

        /*
        // create arrays to hold csv data
        y2013 = [];
        y2014 = [];
        y2015 = [];
        y2016 = [];
        y2017 = [];
        y2018 = [];
        y2019 = [];
        y2020 = [];
        y2021 = [];
        y2022 = [];
        country = [];
        countryCode = [];

        for(var i=0; i < data.length-1 ; i++){
            yearpop22 = data[i]["2022"],
            y2022.push(yearpop22),
            yearpop21 = data[i]["2021"],
            y2021.push(yearpop21),
            yearpop20 = data[i]["2020"],
            y2020.push(yearpop20),
            yearpop19 = data[i]["2019"],
            y2019.push(yearpop19),
            yearpop18 = data[i]["2018"],
            y2018.push(yearpop18),
            yearpop17 = data[i]["2017"],
            y2017.push(yearpop17),
            yearpop16 = data[i]["2016"],
            y2016.push(yearpop16),
            yearpop15 = data[i]["2015"],
            y2015.push(yearpop15),
            yearpop14 = data[i]["2014"],
            y2014.push(yearpop14),
            yearpop13 = data[i]["2013"],
            y2013.push(yearpop13),
            countryName = data[i]["Country Name"],
            country.push(countryName),
            code = data[i]["Country Code"],
            countryCode.push(code)
        };  
        console.log(y2013);
        console.log(country);
        console.log(countryCode);
        */
        

        let popYear = data.map(function(d) {
            return{
                Country: d["Country Name"],
                CountryCode: d["Country Code"],
                y2013: d["2013"],
                y2014: d["2014"],
                y2015: d["2015"],
                y2016: d["2016"],
                y2017: d["2017"],
                y2018: d["2018"],
                y2019: d["2019"],
                y2020: d["2020"],
                y2021: d["2021"],
                y2022: d["2022"]
            }
        });

        console.log("popYear", popYear);


        // Filter data where id = selection value
        let filteredData = popYear.filter((c) => c.Country === selection);
 
        // get the first object and assign to variable
        let first = filteredData[0];

        console.log(first);
        
        
        let tracex = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        let tracey = [first.y2013, first.y2014, first.y2015, first.y2016, first.y2017, first.y2018, first.y2019, first.y2020, first.y2021, first.y2022];
        
        // Trace for the data for the horizontal bar chart
        let trace = [{
            x: tracex,
            y: tracey,
            type: "bar",            
        }];

        // set layout
        let layout = {
            title: {
                text:  `<b>${selection} Population from 2013 - 2022</b>`,
                font: {
                    family: "helvetica",
                    size: 30
                        }},
            yaxis: {
                title: "Population",
                font: {
                    family: "helvetica",
                    size: 30
            }},
            xaxis: {
                title: "Year",
                font: {
                    family: "helvetica",
                    size: 30
                },
                tickangle: -45,
                showticklabels: true,
                type: 'category',
            }

        };
            
        // plot bar chart
        Plotly.newPlot("countryBar", trace, layout);
    });
}

// function for demographics panel

function demographics(selection) {
    // Fetch the csv data
    d3.csv(csvPath).then((data) => {

        let info = data.map(function(d) {
            return{
                Country: d["Country Name"],
                CountryCode: d["Country Code"],
                2013: d["2013"],
                2014: d["2014"],
                2015: d["2015"],
                2016: d["2016"],
                2017: d["2017"],
                2018: d["2018"],
                2019: d["2019"],
                2020: d["2020"],
                2021: d["2021"],
                2022: d["2022"]
            }
        });

        console.log("info", info);


        // Filter data where id = selection value
        let filteredData = info.filter((c) => c.Country === selection);
 
        // get the first object and assign to variable
        let first = filteredData[0];

        console.log(first);

        // Clear the previous entries in the demographic section when making new dropdown selection
        // Else selections will stack on top of eachother in the panel
        d3.select("#pop-data").html("");
    
        // Iterate through the entries array created with Object.entries()
        // returns [key, value] array then append
        Object.entries(first).forEach(([key,value]) => {
            d3.select("#pop-data").append("h5").text(`${key}: ${value}`);
        });

    });
}

function optionChanged(selection) {
    bar(selection);
    countryBar(selection);
    demographics(selection);
}

init();