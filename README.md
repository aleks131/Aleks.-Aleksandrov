# Aleks Aleksandrov's Portfolio

A modern, responsive portfolio website built with Next.js, showcasing my skills, projects, and professional experience.

## Features

- Responsive design that works on all devices
- Framer Motion animations for engaging user experience
- Interactive project showcases with detailed information
- Contact form with email functionality
- Dynamic content with smooth transitions
- Optimized performance and accessibility

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## Deploy to GitHub Pages

This portfolio is configured for easy deployment to GitHub Pages.

### Quick Deployment (Windows)

1. Simply run the included deployment batch file:
   ```
   deploy.bat
   ```

This will:
- Initialize git (if not already initialized)
- Add your files to git
- Commit the changes
- Push to your GitHub repository
- Trigger the GitHub Actions workflow to deploy to GitHub Pages

### Manual Deployment Steps

If you prefer to deploy manually:

1. Initialize the repository in your local project folder:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/aleks131/Aleks.-Aleksandrov.git
git push -u origin main
```

2. Go to your GitHub repository settings:
   - Navigate to `Settings` > `Pages`
   - Set up GitHub Pages to deploy from the GitHub Actions workflow

3. The workflow will automatically build and deploy your site when you push changes to the main branch.

4. Your site will be available at: `https://aleks131.github.io/Aleks.-Aleksandrov/`

### Environment Variables for GitHub Pages

The base path has been configured in the `.env.production` file:

```
NEXT_PUBLIC_BASE_PATH=/Aleks.-Aleksandrov
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

[MIT](https://choosealicense.com/licenses/mit/)
