import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_KOTOYANEN_SUPABASE_PROJECT_URL;
const anonKey = import.meta.env.VITE_KOTOYANEN_SUPABASE_ANON_KEY;
export const supabase = createClient(projectURL, anonKey)