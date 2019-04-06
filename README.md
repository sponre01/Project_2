# Project 2 - An Olympic Medal Overview
This is Project 2 for Northwestern's Data Science Bootcamp 2019. Out task was to pick an interesting data set and provide and interactive way for users to explore the data. Using a combination of web-scraping and Leaflet, we created a website with three distinct views: the homepage, a heat-map, and a filterable table.

Team members: ayang2012, haneenammouri, Michele-Lodl, jzefron, sponre01


## The Requirements
- The project runs using a __Python "Flak" App__, including __JavaScript__, __HTML__, and __CSS__
- Powered by a dataset with at least __100 records__
- Using a __SQLite Database__
- Our __chosen track__: A Combination of Webscraping and Leaflet/Plotly
- A new __JS library__: anime - Used to add a span (hooks together part of a text or document) to each letter to create an animation effect on the homepage
- We have many __user-driven interactions__: dropdowns, on-click effects, text boxes, etc.
- __Three views__: the Home/Landing page, a Heat-map, and a Bubble Chart.
- __AWS Elastic Beanstalk__: Used to deploy the final package to the cloud

## The Presentation:

### Our Data
1) Introduce the Theme and give a _brief_ overview of the data
- Years 1896-2008, all medals won, the sport, the color, and the countries
- Web scraping to get country flags
- a geojson

2) We had a front-end and back-end team:
- The back-end team worked on putting all the data into one location and making usable tables for the front-end team, while the front-end team worked on the js/html/css to get the basic visualizations in place
- This required a ton of communication between the two teams: front-end team needed to clearly communicate what data was needed to power the visualization, while the back end-team needed to communicate what data was available while data-munging

3) The whole thing was deployed using AWS

### View One - Home/Landing Page
1) Our beautiful homepage was created by Michele using bootstrap. 
2) The banner uses a new JS library called "anime" to create the animation effect
- Adds a span (hooks together part of a text or document) to each letter
3) It includes dropdowns! Takes us to the Map View

### View Two - Map
1) The map defaults to an "Olympic Ring" color scheme, but you can also change the layers to show a more traditional heatmap
2) The colors are shaded based on the total number of medals each country has won
3) When you click on the country, a pop-up appears, listing the numbers of each color medal and giving you a button to the next view
4) The code: the interesting thing here is that originally the data was coming from two different sources, and that caused a lot of problems in building the map. We figured out that merging on the back end was way more efficient.

### View Three - Bubbles
1) The bubble diagram gives you a visual representation of the total number of medals won for a country, broken down by sport



### Challenges:
1. __Making this map was harder than it seems!__ We used Leaflet and an [open source geojson file](https://github.com/datasets/geo-countries) to make polygons for every country in the world. Then, we wanted to color the countries according to their total medal count - however, the medal data existed in a different place. We spent a long time researching ways to build a map using two different data sources, however, in the end, we learned __it's much better to spend the time properly merging the data on the back-end__, rather than trying to implement a complicated solution on the front-end.
