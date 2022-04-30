# Social Network Api

## Description 
This is an API for a social media network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. This application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Table of Contents
* [Features](#features)
* [Walkthrough-Video](#walkthrough-video)
* [Installation](#installation)
* [Contributing](#contributing)
* [Questions](#questions)

## Features
This application has the following features:
1. API routes for Users:
- GET all users
- GET a single user by id
- CREATE a new user
- UPDATE an existing user
- DELETE a user
2. API routes for Friends:
- Create a new friend to a user's friend list
- Delete a friend from a user's friend list
3. API routes for Thoughts:
- GET all thoughts
- GET a single thought by id
- CREATE a new thought
- UPDATE a thought by id
- DELETE a thought by id
4. API routes for Reactions
- CREATE a reaction stored in a single thought's reaction array field
- DELETE and pull a reaction by the reactions's reactionId value

## Walkthrough Video
### User Routes
![User-routes](assets/img/user_route-video.gif/ GIF)
link: https://drive.google.com/file/d/14_wySUYpjFLeBKlFNs53fBXmp6g_xTS3/view

### Remaining Routes
![Remaining-routes](assets/img/remaining_roures_video.gif/ GIF)
link: https://drive.google.com/file/d/1t5_nk7ljrlFKs22tSrrcX0hudowp1Ngm/view

## Installation
```bash
git clone https://github.com/MuboHouston/social-network-api.git
```

2. Change the working directory

```bash
cd social-network-api
```

3. Install dependencies

```bash
npm install
```

4. Run the app

``` bash 
npm start
```

5. Test the routes on Insomnia 

## Contributing
Contributions, issues, and feature requests are welcome!

## Questions
Find me on GitHub: https://github.com/MuboHouston