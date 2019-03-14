exports.profilePage = (req, res, next) => {
  res.render('profile', { 
    name: req.session.username,
    friends: req.session.friends,
  });
}

exports.loginPage = (req, res, next) => {
  res.render('login', { title: 'Login' });
};