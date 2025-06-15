import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * @openapi
 * /api/test/log:
 *   get:
 *     tags:
 *       - Testing
 *     summary: Test logging functionality
 *     description: Endpoint to test if server logging is working properly
 *     responses:
 *       200:
 *         description: Test messages logged successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Check your terminal for logs
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/log', (req, res) => {
    logger.info('Test log message');
    logger.error('Test error message');
    res.send('Check your terminal for logs');
});

export default router;