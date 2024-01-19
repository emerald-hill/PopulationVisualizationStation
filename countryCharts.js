let csvPath = "/Resources/Past 10 Years/5f7abe17-be9b-4011-940d-2af69fe8ccb7_Data.csv";

d3.csv(csvPath).then(data => console.log(data));

function init() {

    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    // Fetch the csv data
    d3.csv(csvPath).then((data) => {    

        // loop through csv rows to get country names and add to the dropdown
        for(var i=0; i < data.length; i++){
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

// function to display world population bar graph
function bar(selection) {
    // Fetch the csv data
    d3.csv(csvPath).then((data) => {

        // empty arrays for population and country 
        pop = [];
        country = [];

        // loop through csv to add values to population and country arrays
        for(var i=0; i < data.length-1 ; i++){
            yearpop = data[i]["2022"],
            countryName = data[i]["Country Name"],
            country.push(countryName),
            pop.push(yearpop)
            
        };
        console.log(pop);

        // Trace for bar graph
        let trace = [{
            x: country,
            y: pop,
            type: "bar",            
        }];

        // set layout
        let layout = {
            title: {text: "World 2022 Population by Country",
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

// function to display individual country bar graph
function countryBar(selection) {
    
    // Fetch the CSV data
    d3.csv(csvPath).then((data) => {
        
        // use mapping to create object array
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


        // Filter data where the country = selection value
        let filteredData = popYear.filter((c) => c.Country === selection);
 
        // get the first object and assign to variable
        let first = filteredData[0];

        console.log(first);
       
        // set arrays for traces with the y trace pulling the year population data from the created object
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
                text:  `${selection} Population from 2013 - 2022`,
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

        // create separate object with country, country code, and years with population values
        let info = data.map(function(d) {
            return{
                Country: d["Country Name"],
                Code: d["Country Code"],
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


        // Filter data where country = selection value
        let filteredData = info.filter((c) => c.Country === selection);
 
        // get the first object and assign to variable
        let first = filteredData[0];

        console.log(first);

        // Clear the previous entries in the demographic section when making new dropdown selection
        // Else selections will stack on top of eachother in the panel
        d3.select("#pop-data").html("");
    
        // Iterate through the entries array created with Object.entries()
        // returns [key, value] array then append
        Object.entries(first).reverse().forEach(([key,value]) => {
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