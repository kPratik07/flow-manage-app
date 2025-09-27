import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { sendPasswordResetEmail } from '../../../../lib/email';
import { generateToken } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ 
        message: 'If an account with that email exists, you will receive a password reset link.' 
      });
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = generateToken({ 
      userId: user.id, 
      email: user.email,
      type: 'password-reset'
    }, '1h');

    // Send email
    const emailResult = await sendPasswordResetEmail(email, resetToken);

    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'If an account with that email exists, you will receive a password reset link.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
