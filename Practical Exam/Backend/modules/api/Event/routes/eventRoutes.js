import express from "express"
import { addEvent, deleteEvent, getEvent, updateEvent } from "../controller/eventController.js";
import { authMiddleware } from "../../../../middleware/authMiddleware.js";
const eventRoutes = express.Router()

eventRoutes.post('/addEvent',authMiddleware,addEvent)
eventRoutes.get('/getEvent',authMiddleware,getEvent)
eventRoutes.put('/updateEvent',authMiddleware,updateEvent)
eventRoutes.delete('/deleteEvent',authMiddleware,deleteEvent)


export default eventRoutes;