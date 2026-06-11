import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production, you would send an email or save to database here
    console.log('Contact form submission:', { name, email, company, message });

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will respond within one business day.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}
