import { supabaseClient } from '../config/supabaseClient.js';

export const auth = async (req, res, next) => {
    try {
        // Get JWT token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the JWT and get user session
        const { data: { user }, error } = await supabaseClient.auth.getUser(token);

        if (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};