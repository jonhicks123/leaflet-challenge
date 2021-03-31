// Store our API endpoint inside queryUrl (Mag 2.5+ for Past 7 days)
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  createMap(data.features);
});


// marker color function which we will add when creating map
function depthColor(depth) {
    var color = "";
    if (depth <= 0) {color = "#00FFFF"; }
    else if (depth <=10) {color = "#2A81CB"}
    else if (depth <= 30) { color = "#2AAD27"; }
    else if (depth <= 50) { color = "#CAC428"; }
    else if (depth <= 70) { color = "#CB8427";  }
    else if (depth <= 90) { color = "#CB2B3E"; }
    else if (depth > 91) { color = "#940000"; }
    else { color = "#940000"; }
    return color;
};


function createMap(earthquakeData) {

  markers = earthquakeData.map((feature) => 
    L.circleMarker([ feature.geometry.coordinates[1], feature.geometry.coordinates[0] ], {
        radius: (feature.properties.mag*5),
        color: "black",
        stroke: true,
        weight: 0.2,
        fillColor: depthColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75
    }).bindPopup("<h4>Magnitude:" + feature.properties.mag + "</h4><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p><b>Place: " +  feature.properties.place + "<b></p>"))

    var earthquakes = L.layerGroup(markers)
    var magnitudes = earthquakeData.map((x) => (+x.properties.mag));
    //console.log(d3.extent(magnitudes));
    //console.log(magnitudes);

      // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [17.9583, -66.8353],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
  // create legend and set colors to depthcolors (do the addhtml process)
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function(myMap){
      var div = L.DomUtil.create('div', 'legend');
      var depths = [-10, 10, 30, 50, 70, 90];

      depths.forEach(d => {
          var range = `${d} - ${d+20}`;
          if (d >= 90) {range = `${d}+`}
          var addhtml = `<div class="legend-item">
          <div style="height: 20px; width: 20px; background-color:${depthColor(d)}"> </div>
          <div class=legend-text>Depth: <strong>${range}</strong></div>
        </div>`
      div.innerHTML += addhtml
      });
      return div;
  };
  legend.addTo(myMap)
}











