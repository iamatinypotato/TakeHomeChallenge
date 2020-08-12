# @Intercom Take Home Challenge

## 1. Technical problem

### The problem
*We have some customer records in a text file (customers.txt) -- one customer per line, JSON
lines formatted. We want to invite any customer within 100km of our Dublin office for some food
and drinks on us. Write a program that will read the full list of customers and output the names
and user ids of matching customers (within 100km), sorted by User ID (ascending).*

## Requirements
  * Git
  * Node v12.16.x
  * NPM 6.13.4

### To install Git
  * [Click here](https://git-scm.com/downloads) and follow instructions

### To install Node and NPM
* Install Node version [12.16.1 here] (https://nodejs.org/download/release/v12.16.1/)
* No need to install NPM separately as it's shipped with Node

### Project Setup
* Git clone this project
* Inside the project root folder run ``npm i`` to install the required Node.js modules

### To run
```npm start```

### To test
```npm test```

Mocha was used for testing with the inbuilt Node Assertion Library. Chai was considered but it doesn't support promise testing well yet. 

### Output of program (output.txt)
```
[ 4 ] 	Ian Kehoe
[ 5 ] 	Nora Dempsey
[ 6 ] 	Theresa Enright
[ 8 ] 	Eoin Ahearn
[ 11 ] 	Richard Finnegan
[ 12 ] 	Christina McArdle
[ 13 ] 	Olive Ahearn
[ 15 ] 	Michael Ahearn
[ 17 ] 	Patricia Cahill
[ 23 ] 	Eoin Gallagher
[ 24 ] 	Rose Enright
[ 26 ] 	Stephen McArdle
[ 29 ] 	Oliver Ahearn
[ 30 ] 	Nick Enright
[ 31 ] 	Alan Behan
[ 39 ] 	Lisa Ahearn
```
*INTERCOMPERSONAL* :sunglasses:

### Styling 
 - Is based on the Google Style Guide available [here](https://google.github.io/styleguide/jsguide.html)

### General Approach
My first reaction to this task was to take a functional programming approach, which lends itself well to both Node.js and the task at hand. 

After thinking about it for a while I decided to switch it to an OOP approach. I made this decision based largely on the fact that Ruby on Rails is an OO language and Intercom is a Rails shop. By using a recent version of Node, I was able to utilise the new OOP additions to Javascript including private class variables and set up some basic inheritance amongst the  models as well. 

Joi is used to validate the model data prior to creating the instances. Directory labelled ``schema`` contains the validation requirements for each class type. 

### Further Improvements
* Flesh out the model creation section of the app
* Add CLI options for the party longitude, latitude and radius
* Add CLI options for choosing output file path
* Utilize modules like BigDecimal to remove the floating point rounding errors inherent in JS when calculating the distance
* Consider speeding up the distance equations by allowing for quick returns
* Create API to query new customers
* Create Frontend to view filtered list / View map of invitee locations
* Add mailer system to send invites

## 2. Proudest Achievement

### Proudest Achievement
*What's your proudest achievement? It can be a personal project or something you've worked on
professionally. Just a short paragraph is fine, but I'd love to know why you're proud of it, what
impact it had (If any) and any insights you took from it.*


Golf is a sport that has been around for hundreds of years and is currently played by about 60million people worldwide. 
A game as old as this, with rules that have been perfected over centuries, is not one that is exactly ripe for innovation, and yet, there is this one problematic issue that has been growing and frustrating golfers and television viewers for years now. 
The problem is ‘slow play’. An increasing trend has been for golfers to agonise over their shots, viewing the ball from different angles, doing a series of practice swings, and then, often minutes later, mercifully hitting the actual ball closer to the hole. This kind of excessive attention to detail causes viewers to change the channel, opponents to get frustrated, and courses to get backed up with queues for different holes. 

A solution has been proposed in recent years, the ShotClock. This gives golfers a set amount of time in which to take their shot, or suffer a penalty for slow play. My company, with me as Senior Developer, were tasked with implementing this at 3 high-profile PGA events: a Pro Am in England, the Austrian Shotclock Masters in 2018, and then 2019 Golf Sixes in Lisbon, Portugal. 

This required having: a digitized mobile golf cart at each hole displaying the countdown timer; static screens that display the timer at each tee; iPad apps for each referee to control the timer; and live timer-based animations on Sky Sports using information from our API. 
As we couldn’t risk any latency in the timing information, we implemented different systems to try and mitigate latencies over Wi-fi to ensure all countdowns were in sync, across the iPads, carts and the live feed. It was a complicated system with many (literally) moving parts, and all of which was onsite in order to mitigate any latency issues. 

I’m particularly proud of it because of the cross company work it took to get it up and running. The hardware company that provided the digitalised golf carts, the broadcast production team that we bounced messages back and forth with using our API, the onsite I.T team that had set up state of the art internet comms around the course -  including wired boxes, Wi-fi routers and mobile Wi-fi stations using 4G, and we had designed the front-end for the golf carts ourselves in Node.js. 

I also felt very proud of being at the centre of an important, successful experiment for the future of one of the world’s most popular sports, and being able to implement technology to solve an issue that goes to the very heart of the sport. 
