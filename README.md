# NBA_Stat_Check_ReactJS_App

A web app built with React.js that compares stats of NBA players.
Uses React.js and Javscript for frontend/backend.
REST API calls are used for the BallDontLie API (https://www.balldontlie.io/#introduction).

Type in the player name and a season that they played in (in the form of YYYY which represents the year the season started (e.g. 2019 for 19/20 season)), and the app will return that player's Points, Rebounds, Assists, Blocks and Steals for that season to 2 decimal places.

If you select Compare, you can fill in the same details for a different player, or the same player during a different season, and the second search returns the same statistics, except that of the two, whoever has the higher number in the respective category is highlighted in green. 

App will return alerts for player names that don't match any within the database, if the name enterd is not specific enough, or if a season is entered that the player searched for didn't play in. 

#### See Demo folder for example screenshots and video walkthrough
