import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_UR
const supabaseKey = process.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
