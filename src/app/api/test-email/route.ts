import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Export as static for static export
export const dynamic = 'force-static';

// This is a test API route to check if your email configuration is working
export async function GET(req: NextRequest) {
  // Get the email credentials from environment variables
  const emailUser = process.env.EMAIL_USER || 'aleksaleksandrov670@gmail.com';
  const emailPass = process.env.EMAIL_PASS || '';

  // Check if email password is set
  if (!emailPass) {
    return NextResponse.json({
      success: false,
      message: 'EMAIL_PASS is not set. Please add it to your .env.local file.',
      envVars: {
        EMAIL_USER: emailUser,
        EMAIL_PASS_SET: emailPass ? 'Yes' : 'No'
      }
    });
  }

  try {
    // Create a test transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Test the connection
    await transporter.verify();

    // If verification passes, try to send a test email
    const testMailOptions = {
      from: emailUser,
      to: emailUser, // Send to yourself
      subject: 'Test Email from Portfolio',
      text: 'This is a test email to verify your email configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Email Configuration Test</h2>
          <p>This is a test email sent from your portfolio website.</p>
          <p>If you're receiving this, your email configuration is working correctly!</p>
          <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
            This is an automated test message from your email configuration test.
          </p>
        </div>
      `
    };

    // Send the test email
    const info = await transporter.sendMail(testMailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email configuration test passed! A test email has been sent.',
      details: {
        messageId: info.messageId,
        emailUser: emailUser,
        emailPassLength: emailPass.length
      }
    });
  } catch (error) {
    console.error('Email configuration test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Email configuration test failed. See details below.',
      error: (error as Error).message,
      stack: (error as Error).stack,
      envVars: {
        EMAIL_USER: emailUser,
        EMAIL_PASS_LENGTH: emailPass.length,
        NODE_ENV: process.env.NODE_ENV
      }
    });
  }
} 