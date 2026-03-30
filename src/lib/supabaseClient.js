import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imaymmpaabbqdhwvhfp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXBhYWJicWRod3ZoZnAiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxODMwNTIyNywiZXhwIjoxNzQ5ODQxMjI3fQ.3zF7OzRKBQ_NhILb4QnC_2hfKGXfOLNtD7lrKKQK0iM'

export const supabase = createClient(supabaseUrl, supabaseKey)
