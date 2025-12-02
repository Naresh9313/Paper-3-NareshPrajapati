
git clone "";

backend run:nodemon index.js
frontend run:npm start 


.env
----
required for protected routes
  - `MONGO_CONN` = Your MongoDB connection string
  - `PORT` = 3001

Backend

auth
---------
Register(http://localhost:3001/auth/register)
  
login(http://localhost:3001/auth/register
 Authentication: JWT token 

Event
----
-addEvent(http://localhost:3001/event/addevent)
-[getEvent(search,filter,page,limit(pagination)(http://localhost:3001/event/getEvent)
-updateEvent(http://localhost:3001/event/updateevent)
-deleteEvent(http://localhost:3001/event/addevent)



Frontend
---
- http://localhost:3000
-  Register(Api integration)
- login(Api integration)


Event
----
-addEvent
getEvent(search,filter,page,limit(pagination)
-updateEvent
-deleteEvent







