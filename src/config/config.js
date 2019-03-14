const secretKey = require('./secrets') // git.ignore secret file 

module.exports = {
  port: 3000,
  dbURL: 'mongodb://localhost:27017/oauth-express-vk', // path to MongoBD
  dbOptions: { useNewUrlParser: true },
  sessionSecret: "MegaSecretKey",
  vkId: 6896829,  // VK app ID
  vkSecret: secretKey.secretVK, // VK secret key & comment out the first line
  vkCallbackURL:  "http://localhost:3000/auth/vk/callback"
}