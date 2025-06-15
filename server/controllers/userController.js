import { supabaseClient } from '../config/supabaseClient.js';
import logger from '../utils/logger.js';


async function createUserProfile(userData) {
    try {
        logger.info('Starting user profile creation for:', userData.email);
        
        const { data, error } = await supabaseClient
            .from('users')
            .insert([
                {
                    email: userData.email,
                    name: userData.user_metadata?.username || userData.email.split('@')[0],
                    profile_picture: userData.user_metadata?.avatar_url || null,
                    role: 'public'
                }
            ])
            .select()
            .single();

        if (error) {
            logger.error('Database error during profile creation:', error);
            throw error;
        }

        logger.info('User profile created:', {
            email: data.email,
            name: data.name,
            role: data.role
        });

        return data;
    } catch (error) {
        logger.error('Profile creation failed:', error.message);
        throw error;
    }
}

export const signup = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        logger.info('Starting signup process for:', email);

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username,
                }
            }
        });

        if (error) throw error;

        // Create user profile immediately after successful signup
        if (data.user) {
            try {
                const profile = await createUserProfile(data.user);
                logger.info('Signup and profile creation complete for:', email);
                
                return res.status(201).json({ 
                    message: 'Sign up successful! Please check your email to verify your account.',
                    needsVerification: true,
                    profile
                });
            } catch (profileError) {
                logger.error('Profile creation failed during signup:', profileError);
                return res.status(500).json({ 
                    message: 'Signup successful but profile creation failed',
                    error: profileError.message 
                });
            }
        }

        throw new Error('Signup successful but user data not received');
    } catch (error) {
        logger.error('Signup process failed:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        // Check if email is verified
        if (!data.user.email_confirmed_at) {
            return res.status(401).json({ 
                message: 'Please verify your email before logging in.',
                needsVerification: true 
            });
        }

        res.status(200).json({ 
            message: 'Login successful!',
            user: data.user,
            session: data.session 
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const resendVerification = async (req, res) => {
    const { email } = req.body;

    try {
        const { error } = await supabaseClient.auth.resend({
            type: 'signup',
            email: email,
        });

        if (error) throw error;

        res.status(200).json({ message: 'Verification email sent!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const verifyEmail = async (req, res) => {
    const { token_hash, type } = req.query;

    try {
        logger.info('Processing email verification for token:', token_hash);

        if (type === 'email' && token_hash) {
            const { data, error } = await supabaseClient.auth.verifyOtp({
                token_hash,
                type: 'email'
            });

            if (error) {
                logger.error('OTP verification failed:', error);
                throw error;
            }

            logger.info('Email verification complete for:', data?.user?.email);
            return res.status(200).json({ 
                message: 'Email verified successfully!'
            });
        }

        logger.error('Invalid verification request received');
        throw new Error('Invalid verification request');
    } catch (error) {
        logger.error('Verification process failed:', error.message);
        res.status(400).json({ message: error.message });
    }
};