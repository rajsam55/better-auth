import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, 
});


const prisma = new PrismaClient({adapter})


export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    // 1. Check if user already exists in local database via Prisma
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: 'You are already subscribed!' }, { status: 400 });
    }

    // 2. Synchronize data into Mailchimp Audience list
    try {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
        email_address: email,
        status: 'subscribed', // 'subscribed' for single opt-in, 'pending' for double opt-in
      });
    } catch (mailchimpError: any) {
      // Handle the case where user exists on Mailchimp but not in local database
      const errorTitle = mailchimpError.response?.body?.title;
      if (errorTitle !== 'Member Exists') {
        return NextResponse.json(
          { error: errorTitle || 'Failed syncing to newsletter platform' },
          { status: 500 }
        );
      }
    }

    // 3. Save the subscriber into database via Prisma
    await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });

  } catch (globalError) {
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}














