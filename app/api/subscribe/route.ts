import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  try {
    // Example for Mailchimp API
    const response = await fetch(
        
      `https://${process.env.MAILCHIMP_API_SERVER}://{process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      }
    );

    if (response.status >= 400) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Success!' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}