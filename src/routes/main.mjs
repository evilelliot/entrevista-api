import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        "status": 200,
        "message": "Check oficial documentation for endpoints!"
    });
});

export default router;