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
function bar() {
    // Fetch the csv data
    d3.csv(csvPath).then((data) => {

        // create empty arrays as variables
        var pop = [];
        var country = [];
        var yearpop = [];
        var countryName = [];

        // loop through csv to add values to population and country arrays
        for(var i=0; i < data.length-1 ; i++){
            yearpop = data[i]["2022"],
            countryName = data[i]["Country Name"],
            country.push(countryName),
            pop.push(yearpop)
            
        };
        console.log(pop);

        // create bar chart with chart.js
        new Chart(
            document.getElementById('bar'),
            {
              type: 'bar',
              title: '2022 Total Country Populations',
              data: {
                labels: country,
                datasets: [
                  {
                    label: 'Total Population',
                    data: pop
                  }
                ]
              },
              // configuration
              options:{
                plugins: {
                    legend: {
                    display: false
                    },
                    title: {
                    display: true,
                    text: '2022 Total Country Populations',
                    font: {
                        size: 24
                    }
                    }, 
                        // zoom functionality on the 2022 population chart
                        zoom: {
                            // Container for pan options
                            pan: {
                                // Boolean to enable panning
                                enabled: true,

                                drag: {
                                    enabled: true,
                                },
                    
                                // Panning directions. Remove the appropriate direction to disable
                                // Eg. 'y' would only allow panning in the y direction
                                // A function that is called as the user is panning and returns the
                                // available directions can also be used:
                                //   mode: function({ chart }) {
                                //     return 'xy';
                                //   },
                                mode: 'x',
                    
                                rangeMin: {
                                    // Format of min pan range depends on scale type
                                    x: null,
                                    y: null
                                },
                                rangeMax: {
                                    // Format of max pan range depends on scale type
                                    x: null,
                                    y: null
                                },
                    
                                // On category scale, factor of pan velocity
                                speed: 5,
                    
                                // Minimal pan distance required before actually applying pan
                                threshold: 10,
                    
                                // Function called while the user is panning
                                //onPan: function({chart}) { console.log(`I'm panning!!!`); },
                                // Function called once panning is completed
                               // onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
                            },
                    
                            // Container for zoom options
                            zoom: {
                                // Boolean to enable zooming
                                wheel: {
                                    enabled: true
                                },
                                    
                    
                                // Enable drag-to-zoom behavior
                                drag: {
                                    enabled: false
                                },
                    
                                // Drag-to-zoom effect can be customized
                                // drag: {
                                //      borderColor: 'rgba(225,225,225,0.3)'
                                //      borderWidth: 5,
                                //      backgroundColor: 'rgb(225,225,225)',
                                //      animationDuration: 0
                                // },
                    
                                // Zooming directions. Remove the appropriate direction to disable
                                // Eg. 'y' would only allow zooming in the y direction
                                // A function that is called as the user is zooming and returns the
                                // available directions can also be used:
                                //   mode: function({ chart }) {
                                //     return 'xy';
                                //   },
                                mode: 'x',
                    
                                rangeMin: {
                                    // Format of min zoom range depends on scale type
                                    x: null,
                                    y: null
                                },
                                rangeMax: {
                                    // Format of max zoom range depends on scale type
                                    x: null,
                                    y: null
                                },
                    
                                // Speed of zoom via mouse wheel
                                // (percentage of zoom on a wheel event)
                                speed: 70,
                    
                                // Minimal zoom distance required before actually applying zoom
                                threshold: 2,
                    
                                // On category scale, minimal zoom level before actually applying zoom
                                sensitivity: 3,
                    
                                // Function called while the user is zooming
                                //onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                                // Function called once zooming is completed
                               // onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
                            }
                        }
                    }
                    
                    
                }
              }
            
          );
       
    });
}

var myBarChart;
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
        
        //call update bar chart function to create new bar chart on country change from dropdown selection
        updateBarChart(selection, tracex, tracey)
    
        });        

};

// Function to update the bar chart
function updateBarChart(selection, tracex, tracey) {
    // Check if a chart instance already exists
    if (myBarChart) {
        // If it does, destroy the existing chart
        myBarChart.destroy();
    }

    // Create a new chart on the same canvas
    myBarChart = new Chart(
        document.getElementById('countryBar'),
        {
            type: 'bar',
            title: '2022 Total Country Populations',
            data: {
                labels: tracex,
                datasets: [
                    {
                        data: tracey
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `${selection} Population from 2013 - 2022`,
                        font: {
                            size: 24
                        }
                    }

                }
            }
        }
    );
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