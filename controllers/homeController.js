import Home from '../model/home.js';

export const homePage = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'welcome to home page',
      data: ['Daily quote', 'Notification', 'events', 'recent story',
        'Discover groups', 'recent stories', 'councellor']
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
    const stories = await Home.find({});
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
    const events = await Home.fine({});
    res.status(200).json({
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
export const notifications = async (req, res) => {
  try {
    const notification = await Home.fine({});
    res.status(200).json({
      success: true,
      message: 'successful',
      data: [notification]
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'not found'
    });
  }
};

// get daily quote (access: users and admin)
export const dailyQuote = async (req, res) => {
  try {
    const quotes = await Home.fine({});
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
    const groups = await Home.fine({});
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

export const councellor = async (req, res) => {
  try {
    const councellors = await Home.fine({});
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
