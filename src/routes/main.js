const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const render = require('../pages/render');

router.get('/', auth.isAuthentificated, render.profilePage);
router.get('/login', render.loginPage);

module.exports = router;
