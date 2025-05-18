const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.get('/', settingsController.getSettings);
router.post('/update-avatar', settingsController.updateAvatar);
router.post('/change-bio', settingsController.changeBio);
router.post('/change-username', settingsController.changeUsername);
router.post('/change-email', settingsController.changeEmail);
router.post('/change-password', settingsController.changePassword);

module.exports = router;
