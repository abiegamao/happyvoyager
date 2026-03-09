import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-side only client using the service role key (bypasses RLS)
// NEVER expose this on the client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
