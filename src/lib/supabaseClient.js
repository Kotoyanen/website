import { createClient } from '@supabase/supabase-js'

const projectURL = process.env.KOTOYANEN_SUPABASE_PROJECT_URL;
const anonKey = process.env.KOTOYANEN_SUPABASE_ANON_KEY;
export const supabase = createClient(projectURL, anonKey)