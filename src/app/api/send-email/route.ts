import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or another service
  auth: {
    // These should be set in environment variables in a production environment
    user: process.env.EMAIL_USER || 'aleksaleksandrov670@gmail.com', 
    pass: process.env.EMAIL_PASS || '', // App password for Gmail
  },
});

// Export as static for static export
export const dynamic = 'force-static';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { to, subject, from_name, from_email, message } = body;

    // Validate required fields
    if (!to || !subject || !from_name || !from_email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If no valid email password is set, log the message and return success for development
    if (!process.env.EMAIL_PASS) {
      console.log('Email would be sent with these details (add EMAIL_PASS env variable to send for real):', {
        to,
        subject,
        from_name,
        from_email,
        message
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Email logged in development mode'
      });
    }

    // Log debugging info
    console.log('Attempting to send email with credentials:', {
      user: process.env.EMAIL_USER,
      // Don't log the actual password, just whether it exists
      passExists: process.env.EMAIL_PASS ? 'Yes' : 'No',
      passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
    });

    // Prepare email data
    const mailOptions = {
      from: `"${from_name}" <${from_email}>`,
      to,
      subject,
      replyTo: from_email,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New message from your portfolio website</h2>
          <p><strong>From:</strong> ${from_name} (${from_email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4F46E5;">
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">This email was sent from your portfolio contact form.</p>
        </div>
      `
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      // Return success response
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully!'
      });
    } catch (emailError) {
      console.error('Error from Nodemailer:', emailError);
      return NextResponse.json({ 
        error: 'Failed to send email. Nodemailer error: ' + (emailError as Error).message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 