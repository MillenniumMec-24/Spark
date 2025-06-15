import { supabase } from '../config/supabaseClient.js';

export const getCurrentUser = async (token) => {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return user;
};