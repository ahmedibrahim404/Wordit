![alt text](https://github.com/ahmedibrahim404/Wordit/blob/master/images/WORDit.png?raw=true)


## Info
- WORDit is a word-games website where you can play with your friends or compete globally in guessing the correct word/equation!

- In the game y ou try to guess the correct word/equation in a minimum number of attempts. (e.g. ‘apple’, ‘3+12=15’, ‘15*2=30’, ‘agent’, ...etc)

- As when the player enters an attempt, the play automatically gives back a feedback of colors (e.g. red, yellow, and green)
    1. Red means that the character/number entered in this tile is not present in the correct word
    2. Yellow means that the character/number entered is present in the correct word but in different position
    3. Green means that the character/number entered is present and in its correct place

### Contest
- There is two types of contests (global/private)
- In private contests it’s up to player to choose
    1. Contest Duration
    2. Number of players to enter the contest
    3. Number of rounds in the contest i.e. (number of words)
    4. Number of attempts allowed for each round
    5. Limit the players who join the contest (by giving the contest code only to their friends/people allowed to join)
- In public contests all of these features are fixed (in `.env` file)

### Features:
- Player can choose to player word game or equation game
- Player can enter a contest globally and compete against people all over the world
- Player can create their own contest to play with their friends (Private Contest)
- Each player can see other players panels during the round (only results i.e. colors) just to feel more excited and to make the game more interactive (this is build over websockets)
- There is a scoring system with penalty for each round in the contest:
- Each round has a total score of 100, if the player gets the correct answer after k trials then they will get score of `max(0, 100-k*10)` , so this means will be penalized by 10 every time they provide a wrong guess
- Scoreboard available during the contest sorted based on score


## Live screenshots/gifs
#### Creating Contest/ Joining Contest
![V1](https://github.com/ahmedibrahim404/Wordit/blob/master/images/1.gif)

#### How it's played
![V2](https://github.com/ahmedibrahim404/Wordit/blob/master/images/2.gif)

### Tech
READit mainly depend on:
* [Expressjs] - Run the back-end server
* [Socket.io] - For two-way communication between web clients and server
* [Reactjs] - For frontend


## Getting Started
Wordit requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

1. Clone the repositroy
```sh
$ git clone https://github.com/ahmedibrahim404/Wordit
```

2. Navigate to repo location
```sh
$ cd Wordit
```

3. Install depenedencies
```sh
$ npm install
```

3. Create your .ENV file and add NEEDED vars
```sh
PORT = 8080
REQ_NUM = 3 # means required number of players for global contest
CONTEST_TIME = 5000 # in milliseconds
WORDS_PER_CONTEST = 3
MAX_NUMBER_OF_TRIALS = 5 # means maximum trials for each word
PENALITY_PER_WRONG = 10 # means penalty of wrong for each
```

Run backend server
```sh
$ npm run start
```

Run frontend server

1. Navigate to frontend directory
```sh
$ cd wordit/frontend/
```

2. Edit `config.js` to contain your data
3. Run the server
```sh
$ npm run start
```

For frontend
```sh
$ cd wordit/frontend/wordit/
$ npm run start
```