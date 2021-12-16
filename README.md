
# Backend Coding Challenge 


Assuming that we already have an existing game and I was asked to create
a separate internal API service that will be called by the game to progress a players quest. 

As such this should be a stand-alone API project. 




## - Documentation Includes -

- Tech Stack
- How to run & Install Locally
- Data Schema 
- API Reference
- Running Tests
- Authors
##### End

---
---

---


## Tech Stack

**Testing:** Postman

**Server:** Javascript, NodeJS, ExpressJS

**Other Technologies**:
- JSON 
- Postman - for testing the APIs
- VSCode - IDE 


## Folder Structure

    ├── controllers        # Express Route Controllers for all endpoints of the app
    ├── data               # Where Data files are stored (JSON)
    ├── models             # Database models (for future replacement of JSON)
    ├── node_modules       # Modules installed for developing and testing the current backend
    ├── routes             # API routes
    ├── server.js          # app main file for running 
    ├── package.json       # 
    └── README.md          # Explain all parts of the current project




#### Layer Architecture
     Controllers <--> Service Layer <--> Data Access Layer

     Service Layer should be used for Game logic

     
## Run Locally

Clone the project



Go to the project directory
\
(assuming you have downloaded it on your local computer / server)
```bash
  cd my-project
```

Install dependencies
\
(make sure you have node installed on the device that will be running this project)

```bash
  npm install
```

Start the server

```bash
  npm start
  (starts the backend at http://localhost:3030/)
```

To check or test
if the backend is running check 
\
@ http://localhost:3030/test/





## Current Data Schema (JSON)


```bash
{ 
    "Title" [String]: "Players data storage file for the Backend Coding Challenge",

    "Version" [String]: "1.0.0",

    "Technologies Used" [Array]: [

        "Javascript",
        "NodeJS",
        "ExpressJS",
        "JSON",
        "Postman",
        "VSCode"

    ],


    // Configurable Values
    "configuration" [Object] : {

        "NumberOfQuests"[Number] : 50,
        "RateFromBet"[Number] : 1.1,
        "LevelBonusRate"[Number] : 1.2

    },

    
    "playersData" [Object] : {

        [PlayerID][String]: {

            "lastUpdated" [String]: Date & Time + Timezone,

            "progress" [Object] : {

                "PlayerLevel": [Number],
                "QuestPointsEarned": [Number],
                "TotalQuestPercentCompleted": [Number],
                "TotalChips": [Number],

                "MilestonesCompleted"[Array]: [

                    {
                        "MilestoneIndex":  [Number],
                        "ChipsAwarded":  [Number]
                    }

                ]
            }
        }
    }
```

## API Reference

#### Get all Players

```http
  GET http://localhost:3030/api/players/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  | `string` | **Required**. Your API key |

#### Get player's state

```http
  GET http://localhost:3030/api/state/${playerid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `playerid`      | `string` | **Required**. Player's Id to fetch state |

#### Post player's progress

```http
  POST http://localhost:3030/api/progress/
```

| Data Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `PlayerId, PlayerLevel, ChipAmountBet`      | `string` | **Required** |


#### Add a new player

```http
  POST http://localhost:3030/api/players/new
```

| Data Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `PlayerId`      | `string` | **Required**. To add a new player record |




### Changing / Viewing Current Configuration
Values that can be viewed or changed internally



```http
   "NumberOfQuests","RateFromBet", "LevelBonusRate"
```


#### Change "NumberOfQuests" Value

```http
  POST http://localhost:3030/api/config/questsno/${val}
```

| Data Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `val`      | `string` | **Required**. To change the "NumberOfQuests" value in the current configuration |



#### Change "RateFromBet" Value

```http
  POST http://localhost:3030/api/config/betrate/${val}
```

| Data Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `val`      | `string` | **Required**. To change the "RateFromBet" value in the current configuration |



#### Change "LevelBonusRate" Value

```http
  POST http://localhost:3030/api/config/bonusrate/${val}
```

| Data Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `val`      | `string` | **Required**. To change the "LevelBonusRate" value in the current configuration |




## Running Tests

To run tests, run the following command

```bash
  http://localhost:3030/test
```
or

```bash
  http://localhost:3030/api/players/list
```


## Authors

- [@yaseribrahim](https://www.github.com/yessur3808)


