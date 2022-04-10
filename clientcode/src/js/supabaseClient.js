import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://mwwrzadxsiodfzxknimw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjAyNzgzNCwiZXhwIjoxOTUxNjAzODM0fQ.CO-N6xL40HPI9SooPTdSCMB04_h3exeI5EZm7aRsiuI'
)

export default supabase;