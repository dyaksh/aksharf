import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for newsletter subscribers (in production, use a database)
const subscribers: { email: string; subscribedAt: string }[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check for duplicate subscription
    const existing = subscribers.find((s) => s.email === trimmedEmail);
    if (existing) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed to our newsletter.' },
        { status: 200 }
      );
    }

    // Add subscriber
    subscribers.push({
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
    });

    // In production, you would:
    // 1. Save to a database
    // 2. Send a welcome email
    // 3. Integrate with email marketing service (Mailchimp, SendGrid, etc.)
    console.log('Newsletter subscription:', { email: trimmedEmail, totalSubscribers: subscribers.length });

    return NextResponse.json(
      { success: true, message: 'Welcome aboard! You\'ll receive our latest updates and hospitality insights.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}
