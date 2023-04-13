import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://gqaknoffudxsvldlbwic.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYWtub2ZmdWR4c3ZsZGxid2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzMDQzMDUsImV4cCI6MTk5Njg4MDMwNX0.IWyUQWCKBP1PsfM_Bc-XjY7rYlmcWRGMbbs7zHwn2wo';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoServices() {
  return { 
      getAllVideos() {
        return supabase.from("video")
            .select("*");
          }
        }
  }