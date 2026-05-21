import { NextResponse } from 'next/server';

// GET /api/breach?email=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email query parameter' }, { status: 400 });
  }

  const lower = email.toLowerCase();

  // If an API key is provided, use HaveIBeenPwned real service.
  const apiKey = process.env.NEXT_PUBLIC_HIBP_API_KEY || '';
  const encoded = encodeURIComponent(lower);

  if (apiKey) {
    const hibpUrl = `https://haveibeenpwned.com/api/v3/breachedaccount/${encoded}`;
    try {
      const response = await fetch(hibpUrl, {
        method: 'GET',
        headers: { 'hibp-api-key': apiKey },
      });
      if (response.ok) {
        const data = await response.json();
        // data is an array of breach objects.
        return NextResponse.json({ compromised: true, breaches: data }, { status: 200 });
      }
      if (response.status === 404) {
        // No breach found for this email.
        return NextResponse.json({ compromised: false, breaches: [] }, { status: 200 });
      }
      // Other status codes – treat as error.
      return NextResponse.json({ error: 'External service error', status: response.status }, { status: 502 });
    } catch (err) {
      console.error('HIBP fetch error', err);
      // fall back to mock detection below.
    }
  }

  // Mock fallback – simple keyword detection.
  if (lower.includes('leak') || lower.includes('breached')) {
    return NextResponse.json({
      compromised: true,
      breaches: [{ Title: 'Mock breach (keyword detected)', Name: 'Mock breach' }],
    });
  }

  return NextResponse.json({ compromised: false, breaches: [] });
}
