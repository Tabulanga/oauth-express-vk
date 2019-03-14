const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const profile = require('../controllers/profile');

router.get('/auth/vk', auth.authVkRequest);
router.get('/auth/vk/callback', auth.authVkGetToken);
router.get('/getprofile', profile.getProfile);

module.exports = router;