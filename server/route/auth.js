const express = require('express');
const router = express.Router();
const {login} = require('../controller/authController');

//กำหรดให้ที่ url นี้ จะทำงานอะไร (เรียกใช้งาน login จากใน authController)
router.post('/login',login);

module.exports = router


