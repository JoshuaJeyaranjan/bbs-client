# Project Title
Better Basketball Stats (BBS)

## Overview

What is your app? Brief description in a couple of sentences.

BBS in its final form will be the most comprehensive, and accessible repository of historical and current NBA data for all players, teams, coaches. 

Data will include: 
biographical information,
statistical information, 
graphical representations of statistical information,
accolades,

+ more

My Goal for the 27th:

Basic Information about all active teams in NBA 
    for all seasons in NBA history

Basic information about all players in nba history
    for all seasons in NBA history

User Login/Authentication 

Watch List feature 

Dark Mode feature 

### Problem

Why is your app needed? Background information around any pain points or other reasons.

The current nba reference website sucks, it has a terrible ui and is difficult to interpret and maneuver.

it also is completely non customizable whatsoever

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

Daniel: 24 y/o watched basketball since he was a kid, plays often with friends. keeps up with regular season and discusses basketball with people in person and online. 

Would use this app in order to understand player/team trajectory, performance, and to differentiate between achievement on the court vs. hype.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

    Login Feature 
        Diving Deeper: Google Authentication

    Watch List 
        User adds player or team to watch list that will subtly alter the representation of the statistics of the respective team/player
            so users can easily differentiate them when looking at data
    
    Dark mode 

        Diving Deeper: Themes for site that resemble team colors for all 30 teams
        Diving Deeper: Themes for all jerseys the nba has ever used 
    
    Beautiful Components that display crucial data in a clean, minimalistic way

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

React
MySql
Knex 
Axios

Diving Deeper:
React Native

### APIs

List any external sources of data that will be used in your app.

balldontlie api is the main resource I'll be using. It appears to have all the crucial data that i need.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

HomePage
    This will be a pretty simple page where users can see scoring leaders & team rankings 
        If the user is logged in they should see the players and teams on their watch list

WatchList Components 
    will be displayed on homepage

Sign-Up Page
    This page will be where a user can create an account 

Sign-In Page
    This page will be where a user can log in or out of their account

PlayerPage
    This page will be designed to display data about an individual player in a simple, clean, clear way.
    you will be able to add a player to your watchlist from this page

PlayerList
    This page will simply be a list of all players, there should be a search bar on top so that users can search for players, the list should dynamically re-render as user types in a name.

    Diving Deeper: The players are all listed in a table and you can sort by position, stats, team, etc.

    Diving Deeper: You can add a player to your watchlist from the player list 

TeamPage 
    This page will be designed to display data about an individual player in a simple, clean, clear way.
    You will be able to add a team to the watchlist from this page

TeamListPage 
        This page will simply be a list of all teams, there should be a search bar on top so that users can search for teams, the list should dynamically re-render as user types in team names.

       Diving Deeper: The teams are all listed in a table and you can sort by wins, stats, titles, etc.

      Diving Deeper: You can add a team to your watchlist from the team list 

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

Im going to need tables for:

Players
Teams
StatisticSets
Seasons

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

www.bbs.com

www.bbs.com/players

www.bbs.com/players/:(id)

www.bbs.com/teams

www.bbs.com/teams/:(id)

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Yes we will have a login system that only requires:

email

password

first name 

Diving Deeper: Google Authentication

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

Nice to haves are: 

Google Authentication

Themes for all teams and all jerseys

Comparison of players 

Comparison of past performances 

Graphical Representations of data 

World Class UI/UX

All data that competitor is currently displaying

React Native App

