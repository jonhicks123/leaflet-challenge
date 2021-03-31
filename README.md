# Visualizing USGS Data with Leaflet

## Background

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. To help better visualize their data, I used the a dataset from their website which shows all earthquakes from the past 7 days with a magnitude of 2.5+. 

The geoJson dataset: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson

## Process

- Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

- Added data markers to reflect the magnitude of each earthquake by their size, and depth of each earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth range with the colors found in the legend.

- Included popups that provide additional information about the earthquake when a marker is clicked.

- Created a legend that provides context for the map data.
