import axios from 'axios';
import Story from '../model/userStory.js';
import Event from '../model/events.js';
import Group from '../model/groups.js';
import Quote from '../model/quote.js';
import User from '../model/user.js';
import Councellor from '../model/councellor.js';



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
  const page = parseInt(req.query.page) || 1 // requested page by client
  const dataPerPage = 5;
  try { 
    // number of data to skip
    const skipData = (page - 1) * dataPerPage;
     await Story.find({})
    // add pagination , 5 stories per page
    .skip(skipData).limit(dataPerPage)
    .then((story) => {
      if(story.length === 0) return res.status(404).json({
        succes: true,
        message: 'no more data found'
      })
     return res.status(200).json({
      success: true,
      message: 'successful',
      data: story
    });
    })
    
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: ' not found'
    });
  }
};

// get events (access: users and admin)
export const events = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const dataPerPage = 5;
  try {
    const skipPage = (page - 1) * dataPerPage;
     await Event.find({})
    .skip(skipPage).limit(dataPerPage).then((event) => {
      if (event.length === 0) {
        return res.status(201).json({
          message: 'no more data found'
        })
      }
      return res.status(200).json({
      success: true,
      message: 'successful',
      data: events
    });
    })
  } catch (err) {
   return  res.status(404).json({
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
  const page = parseInt(req.query.page) || 1; // requested page
  const dataPerPage = 5;
  try {
    // fectch daily quote from external api
    // randomly fetch quotes from db or external api
    const skipData = (page - 1) * dataPerPage;
    await Quote.find({}).skip(skipData).limit(dataPerPage)
    .then((quote) => {
      if (quote.length === 0) {
        return res.status(200).json({ message: 'no more data fetch'})
      }
     return res.status(200).json({
      success: true,
      message: 'successful',
      data: quote
    });
    }) 
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// get groups (access: users and admin)
export const discoverGroup = async (req, res) => {
  try {
    const groups = await Group.find({});
    return res.status(200).json({
      success: true,
      message: 'successful',
      data: [groups]
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// all availaible councellor
export const councellor = async (req, res) => {
  const page = parseInt(req.query.page) || 1 // requested page;
  const dataPerPage = 5;
  try {
    const skipData = (page - 1) * dataPerPage;
    await Councellor.find({})
    .skip(skipData).limit(dataPerPage).then((councellor) => {
      if (councellor.length === 0){
      return res.status(200).json({ message: 'no more councellorfound'});
    }
      return res.status(200).json({
      success: true,
      message: 'successful',
      data: [councellor]
    });
    })
  } catch (err) {
    return res.status(404).json({
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
        return res.status(404).json({
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
      return res.status(200).json({
        success: true,
        message: 'your event has been schedule',
        data: newEvent
      })
    })
  } catch (err) {
    return res.status(500).json({
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
      return res.json({
        success: true,
        message: 'your quote is purblished',
        data: newQuote.quote
      });
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// fetch quote fron third party api and save to db
export const fetchQuote = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const baseUrl = 'http://quotes.rest/qod?category=inspire'
  try {
    await axios.get(baseUrl,
      {
      headers: {
        'X-TheySaidSo-Api-Secret': apiKey
      }
    }).then((response) => {
      return res.status(200).json({
        success: true,
        data: response.data.contents.quotes[0]
      })
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: err
    })
  }
}

// create group
export const createGroup = async (req, res) => {
  try {
    await User.findOne({ _id: req.params.userId }).then( async (user) => {
      if (!user) {
        return res.status(404).json({
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
      return res.json({
        success: true,
        mesage: `you created ${newGroup.groupName} Group`,
        data: newGroup
      });
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// join group
export const joinGroup = async (req, res) => {
  try {
    // find a group to join
    await Group.findById({ _id: req.params.groupId}).then( async (group) => {
      if (!group) {
        return res.status(404).json({
          success: false,
          message: 'group not found or not exist'
        });
      }
      // check for valid user before join group
      await User.findOne({ _id: req.params.userId}).then( async (user) => {
        if (!user) 
          return res.status(404).json({
            success: false,
            message: 'not a valid user!, login to continue'
          });
          
        // append user to groupMember
        await Group.findByIdAndUpdate({ _id: req.params.groupId },
          { $push: { groupMember: user }},
          { new: true });
      });
      return res.status(200).json({
        success: true,
        message: `you join ${ group.groupName}`,
        data: group
      });
    });
  } catch (err) {
     res.json({
      message: err.message,
      data: err
    });
  }
}

// be a councellor
export const newCouncellor = async (req, res) => {
  try {
    // check for existing user
    const isUser = await User.findOne({ _id: req.params.userId});
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: 'not a valid user, register to continue'
      });
    }
    // create a new councellor
    await new Councellor({
      userId: isUser._id,
      specification: req.body.specification,
      experience: req.body.experience
    }).save().then((councellor) => {
      return  res.status(200).json({
        success: true,
        message: `congratulation on being a ${councellor.specification} councellor`,
        data: councellor
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

