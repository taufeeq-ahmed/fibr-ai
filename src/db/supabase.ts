import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

export default supabase;
