import Story from '../model/userStory.js';
import Event from '../model/events.js';
import Group from '../model/groups.js';
import Quote from '../model/quote.js';
import User from '../model/user.js';



export const homePage = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'welcome to home page',
      data: ['/Dailyquote', '/Notification', '/events', '/recent story',
        '/Discover groups', '/recent stories', '/councellor']
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: '404 page, try again'
    });
  }
};

// get recent stories (access: users and admin)
export const recentStory = async (req, res) => {
  try {
    const stories = await Story.find({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: stories
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: ' not found'
    });
  }
};

// get events (access: users and admin)
export const events = async (req, res) => {
  try {
    const events = await Event.find({});
   return res.status(200).json({
      success: true,
      message: 'successful',
      data: events
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// get notification (access: users and admin)
// export const notifications = async (req, res) => {
//   try {
//     const notification = await Notification.find({});
//     res.status(200).json({
//       success: true,
//       message: 'successful',
//       data: [notification]
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: 'not found'
//     });
//   }
// };

// get daily quote (access: users and admin)
export const dailyQuote = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: quotes
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// get groups (access: users and admin)
export const discoverGroup = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: [groups]
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// all availaible councellor
export const councellor = async (req, res) => {
  try {
    const councellors = await Councellor.find({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: [councellors]
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// create event
export const createEvent = async (req, res) => {
  try {
    const isUser = req.params.userId
    await User.findOne({ _id: isUser}).then( async (user) => {
      if(!user) {
        res.status(404).json({
        success: false,
        message: 'you are not logged In, login to continue'
        })
      }
      const newEvent = new Event({
        title: req.body.tittle,
        eventTime: req.body.time,
        eventDate: req.body.date,
        eventSpace: req.body.venue,
        userId: user._id
      });
      await newEvent.save();
      res.status(200).json({
        success: true,
        message: 'your event has been schedule',
        data: newEvent
      })
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

// compose quote
export const createQuote = async (req, res) => {
  try {
    await User.findOne({ _id: req.params.userId }).then( async (user) => {
      if (!user) {
       return res.status(404).json({
          message: 'not a user, login to continue'
        })
      }
      const newQuote = new Quote({
        userId: user._id,
        quote: req.body.quote,
      })
      await newQuote.save();
      res.json({
        success: true,
        message: 'your quote is purblished',
        data: newQuote.quote
      });
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// create group
export const createGroup = async (req, res) => {
  try {
    await User.findOne({ _id: req.params.userId }).then( async (user) => {
      if (!user) {
        res.status(404).json({
          message: 'login to continue'
        })
        return;
      }
      const newGroup = new Group({
        userId: user._id,
        groupName: req.body.name,
        description: req.body.description
      })
      await newGroup.save();
      res.json({
        success: true,
        mesage: `you created ${newGroup.groupName} Group`,
        data: newGroup
      });
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// join group