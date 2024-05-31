import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtpqxwmicmkcfwxmanjx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cHF4d21pY21rY2Z3eG1hbmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNjg5MDYsImV4cCI6MjAzMjc0NDkwNn0.6wWB-TCRBM5tnta4csGmx2ERcvFdvBijcBSIIY-Kul4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
