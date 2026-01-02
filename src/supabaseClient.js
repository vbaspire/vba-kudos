import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sbowplbikupkhfvpfeex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNib3dwbGJpa3Vwa2hmdnBmZWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzQ5NzQsImV4cCI6MjA4Mjk1MDk3NH0.uehEXi2p35TYPjy_7Cqx-xLe6c9nhWQgtKbZ0Qdyjfc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
