import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.config.js';
import userRoutes from './routes/users.js';
import testRoutes from './routes/test.js';
import logger from './utils/logger.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);

/**
 * @openapi
 * /test-log:
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
app.get('/test-log', (req, res) => {
    logger.info('Test log message');
    logger.error('Test error message');
    res.send('Check your terminal for logs');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});