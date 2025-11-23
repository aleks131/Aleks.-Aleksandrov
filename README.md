This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Email Configuration

This portfolio includes a contact form that sends emails using Nodemailer. To set up the email functionality:

1. Create a `.env.local` file in the root directory (or update the existing one)
2. Add your email credentials:
   ```
   EMAIL_USER=yourname@gmail.com
   EMAIL_PASS=your-app-password
   ```
3. For Gmail, you need to generate an App Password:
   - Go to your Google Account > Security > 2-Step Verification
   - At the bottom, click on "App passwords"
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "Portfolio Contact Form")
   - Use the generated 16-character password as your EMAIL_PASS

Without valid email credentials, the contact form will still work in development mode, but messages will only be logged to the console.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
