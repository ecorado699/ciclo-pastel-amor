// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dldgzzyugtzydbpwceri.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZGd6enl1Z3R6eWRicHdjZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0OTQyNDQsImV4cCI6MjA2NDA3MDI0NH0.ATjNZNk71bO9cbcgZFZgMg40PUMvM5NzrWN0FTRq9kY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);