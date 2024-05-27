import { createClient } from "@supabase/supabase-js"
import { Database } from "../types/supabase"

export const SUPABASE_CLIENT = createClient<Database>("https://hybpmsqwnaydyoiimuau.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnBtc3F3bmF5ZHlvaWltdWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3ODA4MzYsImV4cCI6MjAzMjM1NjgzNn0.X2UTBXZXn7FieJYcQj9Xd9KNEtvU0T9skt9sdcYN-SM")
