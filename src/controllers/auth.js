const axios = require('axios');
const config = require('../config/config.js');

exports.authVkRequest = (req, res) => {
  const vkAuthUrl = "https://oauth.vk.com/authorize?"
    + "client_id=" + config.vkId
    + "&display=page"
    + "&redirect_uri=" + config.vkCallbackURL
    + "&scope=friends&response_type=code&v=5.92&state=123456"
  
    res.redirect(vkAuthUrl);
}

exports.authVkGetToken = (req, res) => {
  if (!req.query.code) return res.redirect('/login'); 

  const vkAuthUrl = "https://oauth.vk.com/access_token?"
    + "client_id=" + config.vkId
    + "&client_secret=" + config.vkSecret
    + "&redirect_uri=" + config.vkCallbackURL
    + "&code=" + req.query.code

  axios.get(vkAuthUrl)
  .then(response => {
    req.session.accessToken = response.data.access_token;
    req.session.userID = response.data.user_id;

    res.redirect('/getprofile');
  })
  .catch(error => {
      console.log(error);
      res.redirect('/login');
  })
}

exports.isAuthentificated = (req, res, next) => {
  if (!req.session.friends) {
    res.redirect('/login');
  } else {
    next()
  }
};
