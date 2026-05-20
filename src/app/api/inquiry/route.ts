import { NextRequest, NextResponse } from 'next/server';

const inquiries: Array<Record<string, unknown>> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, parentName, mobile, classApplying } = body;
    if (!studentName || !parentName || !mobile || !classApplying) {
      return NextResponse.json({ error: 'Please fill all required fields' }, { status: 400 });
    }
    const inquiry = { id: Date.now().toString(), ...body, createdAt: new Date().toISOString() };
    inquiries.push(inquiry);
    return NextResponse.json({ message: 'Inquiry submitted successfully', id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
