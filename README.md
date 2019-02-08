### Suicide Burn
A remake of the classic Atari game 'Lunar Lander', named Suicide Burn, which is the act of firing off the rocket at the last possible second for a safe landing and maximum fuel efficiency.

### Background

**Lunar Lander** is a classic arcade space flight simulation game where the player has the control of a spaceships thrusters and orientation. The player must maneuver the ship and land it safely on a flat surface on the moon. The surface of the moon is Randomly generated, and resembles mountains and hills.Some flat areas of the hills have multipliers for the player's score, should the player manage to land on them. These are the basic rules of the game:


1) The spaceship begins with a set amount of horizontal velocity,
2) The Moon has a set amount of gravity, which affects the ships trajectory, realistically,
3) The Ship start with a set amount of fuel, and losses fuel at a linear rate as the engine fires,
4) After each landing, a new field is generated, but the fuel remains the same as the last round,
5) Game ends when the player either runs out of fuel or crashed the spaceship,
6) Conditions for a "crash" are vertical speed higher than 5 m/s and/or horizontal angle greater than 20 degrees

The core Lunar Lander game does not have any variations, however there are many assistance options and other features that can be added to the game that are outlined in **Functionality & MVP** and **Bonus Features** sections.

### Functionality & MVP  

With this Lunar Lander game, users will be able to:

- [ ] Start and pause pause
- [x] Rotate the ship and fire the engine
- [ ] keep track of the high scores

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app is a single page side scrolling game with a few assistance options user can turn on before pressing start. The features are bonus features and are trajectory prediction, suicide burn indicator, and option to zoom in the view when the ship ground distance is very low. The user can also click on a button which brings up the model about game history and features.
Upon starting the game, the user can fire the engine using space bar, and turn the ship left or right using the directional keys. The lunar surface will be randomly generated, however there are multiple flat surfaces guaranteed. Some of the flat surfaces are randomly assigned bonus point multipliers.
If the player turns on the assistance features, which are bonus features, a line is drawn from where the rocket is to where it is predicted to land. the line is two colors, orange and red. red is an indication of a 'suicide burn' point, which is a point where the rocket has to fire to land safely, otherwise there is not enough thrust to stop the rocket beyond this point.



![wireframes](https://github.com/Nader-gator/SuicideBurn/blob/master/wireframFinal.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `HTML5 canvas` for drawing the game,
- `Webpack-cli` to bundle JavaScript files.

In addition to the entry file, there will be three scripts involved in this project:

`surface.js`: this script will be primarily responsible for randomly generating a lunar surface, and placing flat and bonus zones on the surface. It will also hold the 'gravity' value of the moon. This is to allow for increasing the gravity and therefore the difficulty of the game.

`ship.js`: this script will hold all the physics logic of the spaceship, the current location on canvas and also the attributes it needs to calculate its next position every second which are
 - horizontal velocity
 - vertical velocity
 - distance from baseline (the lowest possible point of the moon surface)
 _ orientation of the spaceship
 

### Implementation Timeline

**Day 1**: Set up all the files and folders, create an entry point and a HTML page loading the script. Set up Webpack-cli, review the physics formulas needed to calculate spaceship trajectory properly in presence of gravity, design and implement a random moon surface generator. Implement a render function for the generated surface. Goals for the day:

 - [x] Create a working bundle with Webpack-cli
 - [x] Design a random surface generation algorithm and implement it
 - [x] Implement a render function for the generated surface

**Day 2**: Continue refining the random surface generator. after some refining, dedicate the day into implementing proper physics for the ship object. One the physics are working, finish by creating a presentable HTML canvas drawing for the ship. Goals for the day:

- [x] Iron out any random surface generation bugs and issues
- [ ] Implement all spaceship trajectory physics
- [x] Create a canvas shape for the spaceship


**Day 3**: Create the game collision detection system, points tracking, pause and start game features, 'about' modal. add difficulty setting which adjusts the gravity level. Goals for the day:

- [ ] Add logic needed to start, pause, and finish the game
- [ ] Add difficulty level
- [ ] Add persistent high score tracking
- [ ] Add 'about' modal


**Day 4**: add bonus assistance features. Goals for the day:

- [ ] Create trajectory prediction line, with an option to turn it on or off
- [ ] Create 'Suicide Burn' indicator on top of the trajectory prediction


### Bonus features

There are not many ways to flesh out this game. beyond the assistance features, some extra difficulty could be added to the game

- [ ] Trajectory prediction
- [ ] 'Suicide Burn' point prediction
- [ ] 'Suicide Burn' point prediction
- [ ] Add option to have random meteorites enter the screen
- [ ] Optimize random surface generator to create valleys and more complex surfaces
- [ ] Implement a mode where the user has to land on a very specific area


