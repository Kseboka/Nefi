import { createClient } from '@supabase/supabase-js'

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseKey = env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
