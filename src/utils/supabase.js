import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.production.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.production.VITE_REACT_APP_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
