[![Issues](https://img.shields.io/github/issues/nickcrisci/beatdrinks.svg)](https://github.com/nickcrisci/beatdrinks/issues)
[![License](https://img.shields.io/github/license/nickcrisci/BeatDrinks)](https://github.com/nickcrisci/beatdrinks/blob/main/LICENSE)

![](https://github.com/nickcrisci/BeatDrinks/wiki/images/beatdrinks_banner.png)

## Description
A simple API that returns a song / playlist and a matching cocktail for a given mood.

This project was originally a university project as an introduction to web development. Our idea was to create an API that returns a song / playlist via Spotify and a matching cocktail for a given mood. Since this was a university project a simple `json` File with some cocktails and a _very_ simple matching algorithm did suffice. 

We still think that this is a fun idea, thats why this project is now being revived. There are still a lot of things to be done and help is greatly appreciated (remember that this was a university project... The code might not be the greatest but it is working. And that's what counts... Right?? ;) ). 

## Setup
To run this project locally some things have to be done:
1. You have to create a Spotify API App to receive a client secret and id (see [Spotify API](https://developer.spotify.com/))
1. Clone or fork this project
1. Add a `.env` file in the projects root with the following variables:
    - `CLIENT_SECRET` (your Spotify API Client Secret)
    - `CLIENT_ID` (your Spotify API Client Id)
1. Run `npm install` to install the dependencies
1. Run `npm start` to start the API

Now you should be able to get a track and cocktail combination from the API (see Routes for more information on how to get the data).

## Routes
These are the current available routes and how to use them:

`/combination/track?mood`

 Get a single Track paired with a cocktail, if the mood query parameter is not provided the default mood (happy) will be used.


`/combination/playlist?mood`

 Get multiple Tracks paired with a cocktail, if the mood query parameter is not provided the default mood (happy) will be used.
 
 ## Important
 The code of this API might change a lot over the course of the next few weeks. This includes the routes and the responses. Because of that this API should not be used in a project as a dependency (yet), until we have achived a stable code base.
 
 The last commit that could be seen as belonging to the original university project is [817337c](https://github.com/nickcrisci/BeatDrinks/commit/817337c961100c65df589ad2eb88cc11a51ed362).
 This commit merges some project clean up efforts by @nickcrisci. _This did not change the original functionality of the API_.
