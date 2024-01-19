// ccreate map centered on Charllote, NC - [35.2271, 80.8431]
let myMap = L.map("map", {
    center: [35.2271, -80.8431],
    zoom: 3
});

// add the street layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// load populationData.csv and countries.geojson
let path = "populationchg.csv"
let geoJSON = "countries.geojson"

Promise.all([
    d3.csv(path),
    d3.json(geoJSON)
]).then(([csvData, geoJSONData]) => {
    //console.log(csvData);
    //console.log(geoJSONData);

    // Create key value pair from country name to CSV data
    let csvDataMap = new Map();
    csvData.forEach(row => {
        //'Country Code' is common key in CSV data
        csvDataMap.set(row['Country Code'], row);
    });

    // Update the GeoJSON data properties with CSV data
    geoJSONData.features.forEach(feature => {
        let countryCode = feature.properties.ISO_A3;
        let csvCountry = csvDataMap.get(countryCode);

        if (csvCountry) {
            // Add CSV data properties to GeoJSON properties
            feature.properties = { ...feature.properties, ...csvCountry };
        }
    });

    console.log(geoJSONData);
    
        // make a choropleth data layer
        let choroLayer = L.choropleth(geoJSONData, {
            // choose the property to create the gradients for the choropleth
                // "Change" indicates the change in population for the past 10 years
            valueProperty: ["Change"],

            // establish the range of the color scale for the choropleth 
            scale: ["#bd3737", "#3769bd"],

            // establish the number of breaks (blocks) in the step range on the scale
            steps: 10,

            // establish a mode of "q" so that the breaks are distributed based
            // on quantiles
            mode: "q",

            // add a style attribute that will show an outline on the countries
            style: {
                // border attributes
                color: "#FFFFFF", // white border
                weight: 1.0,
                fillOpacity: 0.75
            },

            // use onEachFeature to get the name of the country and the change data
            // then bind the info to the popups for each county in the map
            onEachFeature: function(feature, layer)
            {
                layer.bindPopup("<b>Country</b>: " + feature.properties.ADMIN + "<hr>" + "<b>Population Change Past 10 Years: </b>" + feature.properties['Change']);
            }

        }).addTo(myMap);

        // set up the legend
        let legend = L.control(
            {position: "bottomright"}
        );

        // use .onAdd to add properties to the legend
        legend.onAdd = function(){
            // draw the legend onto the map by adding a div to the page dynamically
            let div = L.DomUtil.create("div", "info legend");

            // to establish the limits, reference the choropleth layer (choroLayer),
            // and use the valueProperty value to get a value named limits
            let limits = choroLayer.options.limits;

            // to establish the colors on the legend, reference the choropleth layer
            // (choroLayer) and use the scale property to get a value named colors
            let colors = choroLayer.options.colors;

            // create an empty array to hold the blocks that represent the gradients
            let labels = [];

            // adding the maximum and minimum
            let legendInfo = "<h1>Change Past 10 Years</h1>" +
            "<div class=\"labels\">" +
              "<div class=\"min\">" + limits[0] + "</div>" +
              "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

            // to add the legendInfo
            div.innerHTML = legendInfo;

            // make an ul of the limits
            limits.forEach(function(limit, index) {
                labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
              });

            div.innerHTML += "<ul>" + labels.join("") + "</ul>";

            // return the div so that its added to the map
            return div;
        };

        // add the legend to the map
        legend.addTo(myMap);
    }
);