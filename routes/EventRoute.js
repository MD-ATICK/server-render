const express = require('express')
const { isAuthUser } = require('../auth/auth')
const { authorizeRoles } = require('../auth/roleAuth')
const { createEvent, deleteEvent, sellercreateEvent, getevent } = require('../controllers/eventControllers')
const router = express.Router()


router.post('/create-event' , isAuthUser , authorizeRoles('seller' , 'admin') , createEvent)
router.get('/events' , getevent)
router.get('/seller-show-event' , sellercreateEvent)
router.delete('/events' , isAuthUser , authorizeRoles('seller' , 'admin') , deleteEvent)

module.exports = router