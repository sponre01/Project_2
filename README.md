# Project 2 - An Olympic Medal Overview
This is Project 2 for Northwestern's Data Science Bootcamp 2019. Out task was to pick an interesting data set and provide and interactive way for users to explore the data. Using a combination of web-scraping and Leaflet, we created a website with three distinct views: the homepage, a heat-map, and a filterable table.

### The Data
- 
- 


### Tell a story through a visualization
- provide an interactive way for users to explore the data
- 10 min presentation (theme, coding approach, data munging techniques, and final visualizaton)

### Presentation: Saturday April 6

### What we've included:
- Flask app (including html and js)
- Javascript
- Our database
- Heroku is encouraged
- Must have one JS library that we did not cover in class: doesn't have to be crazy, just pick something you can use to learn to read someone else's documentation. Pick something popular!
- Dataset must have at least 100 records
- user-driven interactions are required (menus, dropdown, textboxes, etc) - bootstrap. Add in hover or click effects
- Final visualization includes at least 3 views

### Chosen Track
Web scraping + Leaflet (or Plotly)

### Theme
Olympics!

#### Things we can do
1. Map with each country clickable with pop-up of metal count and game
2. The flag and national anthem will play when you click
3. Games added/subtracted each year
4. Summer/winter/special olympics

1. Cloud-based database set up
2. Scrape into a database


### Challenges:
1. __Making this map was harder than it seems!__ We used Leaflet and an [open source geojson file](https://github.com/datasets/geo-countries) to make polygons for every country in the world. Then, we wanted to color the countries according to their total medal count - however, the medal data existed in a different place. We spent a long time researching ways to build a map using two different data sources, however, in the end, we learned __it's much better to spend the time properly merging the data on the back-end__, rather than trying to implement a complicated solution on the front-end.


## Columns: 
- Country
- number of gold medals
- number of silver medals
- number of bronze medals
- year
- country code
- country lat
- country lon

## Views:
1. Map
2. Country Olympic Specifics
3. Country Facts Specifics
