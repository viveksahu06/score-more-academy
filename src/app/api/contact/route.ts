import { NextRequest, NextResponse } from 'next/server';

const contacts: Array<Record<string, unknown>> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    const contact = { id: Date.now().toString(), ...body, createdAt: new Date().toISOString() };
    contacts.push(contact);
    return NextResponse.json({ message: 'Message sent successfully', id: contact.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
