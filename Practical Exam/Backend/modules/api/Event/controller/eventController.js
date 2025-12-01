import statusCode from '../../../../config/statusCode.js';
import eventModel from '../../../../models/eventModel.js';
import dotenv from 'dotenv';
import { EventValidation } from '../../validationRules.js';
dotenv.config();

export const addEvent = async (req, res) => {
  try {
    const { error } = EventValidation.validate(req.body);
    if (error) {
      return res.status(statusCode.VALIDATION_ERROR).json({
        message: 'Validation error',
        error: error.message,
      });
    }
    const { ename, edate, category } = req.body;
    const newEvent = new eventModel({
      ename,
      edate,
      category,
      user: req.user.id,
    });

    await newEvent.save();
    return res.status(statusCode.SUCCESS).json({
      message: 'Event added successfully',
      newEvent,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error adding events',
    });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5 } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { ename: { $regex: search, $options: 'i' } },
          { ename: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ],
      };
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const event = await eventModel.find(query).skip(skip).limit(Number(limit));

    return res.status(statusCode.SUCCESS).json({
      message: 'Events fetched successfully',
      event,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error geting events',
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const { ename, edate, category } = req.body;

    const update = await eventModel.findByIdAndUpdate(
      id,
      { ename, edate, category },
      { new: true },
    );

    return res.status(statusCode.SUCCESS).json({
      message: 'update event success',
      update,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error updating events',
    });
  }
}



export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.query;

    const deleteEvent = await eventModel.findByIdAndDelete(id);
    if (!deleteEvent) {
      return res.status(statusCode.NOT_FOUND).json({
        message: 'event not found',
        deleteEvent,
      });
    }

    return res.status(statusCode.SUCCESS).json({
      message: 'delete event success',
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'error updating events',
    });
  }
};
