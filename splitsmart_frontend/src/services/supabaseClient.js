import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
/**
 * Returns the initialized Supabase client for app-wide access.
 * Reads credentials from environment variables.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
