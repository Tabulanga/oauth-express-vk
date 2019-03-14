const axios = require('axios');

const getUser = async (req) => {
  const response = await axios.get('https://api.vk.com/method/users.get?' 
    + 'user_id=' + req.session.userID 
    + '&access_token=' + req.session.accessToken
    + '&name_case=gen' 
    + '&v=5.92')

  return response.data.response[0].first_name 
    + ' ' 
    + response.data.response[0].last_name;
}

const getFriendsList = async (req) => {
  const response = await axios.get('https://api.vk.com/method/friends.get?' 
    + 'user_id=' + req.session.userID 
    + '&access_token=' + req.session.accessToken 
    + '&fields=first_name,last_name,photo_50' 
    + '&v=5.92')
  
  return response.data.response.items.splice(0, 5);
}

exports.getProfile = async (req, res) => {
  req.session.username = await getUser(req);
  req.session.friends = await getFriendsList(req);
  res.redirect('/');
}

