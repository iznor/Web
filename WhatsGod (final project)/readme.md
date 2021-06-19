2 Primary Flows:

1.  Login (username : iznor   password : 111) -> Leaderboard -> Watch players profiles, watch your profile in the end.
2.  Challenge -> Select customization for your game (select character to play against, etc.) -> GO!

Notes:

1.  While starting a game, new object is inserted to 'users_211_GAMES' table.
2.  When creating a new user, new object is inserted to 'users_211_USERS' table.
3.  When watching the leaderboard or anyones profile, all data comes from mixed DB tables (with "inner join" queries).
4.  When customizing "challenge" page, all avatars and data come from JSON files.