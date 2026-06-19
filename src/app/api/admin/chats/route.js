export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const queryPasscode = searchParams.get('passcode');
  const headerPasscode = req.headers.get('x-admin-passcode');
  
  const passcode = queryPasscode || headerPasscode;
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'upscore123';
  
  if (!passcode || passcode !== expectedPasscode) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid passcode' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(JSON.stringify({ error: 'Database environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/chat_logs?select=*&order=updated_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      return new Response(JSON.stringify({ error: 'Failed to fetch from database: ' + errText }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const data = await supabaseRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
