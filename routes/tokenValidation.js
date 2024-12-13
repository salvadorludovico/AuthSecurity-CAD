const express = require('express');
const validateToken = require('../middlewares/validateToken');
const router = express.Router();

router.get('/validate', validateToken, (req, res) => {
    res.json({
        valid: true,
        message: 'Token válido.',
        user: req.user,
    });
});

module.exports = router;
