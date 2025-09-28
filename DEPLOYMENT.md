# Deployment Guide

## Quick Start

1. **Clone and Install**
   `ash
   git clone <your-repo-url>
   cd prime
   npm install
   `

2. **Environment Setup**
   - Copy .env.example to .env.local
   - Configure your MongoDB and email settings

3. **Run Development Server**
   `ash
   npm run dev
   `

4. **Access the Application**
   - User Interface: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Set MONGODB_URI=mongodb://localhost:27017/complaints_db

### Option 2: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string
4. Set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaints_db

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password: Google Account  Security  App passwords
3. Set environment variables:
   `env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   `

### Other Email Providers
`env
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
`

## Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Heroku
1. Install Heroku CLI
2. Create Heroku app: heroku create your-app-name
3. Add MongoDB addon: heroku addons:create mongolab:sandbox
4. Set environment variables: heroku config:set EMAIL_USER=...
5. Deploy: git push heroku main

### Netlify
1. Connect GitHub repository
2. Set build command: 
pm run build
3. Set publish directory: .next
4. Add environment variables in Netlify dashboard

## Environment Variables

Required for production:
- MONGODB_URI: MongoDB connection string
- EMAIL_USER: Email username
- EMAIL_PASS: Email password/app password
- ADMIN_EMAIL: Admin email for notifications
- NEXTAUTH_SECRET: Random secret string

Optional:
- EMAIL_SERVICE: Email service (gmail, hotmail, etc.)
- EMAIL_HOST: SMTP host
- EMAIL_PORT: SMTP port
- EMAIL_SECURE: Use SSL/TLS
- COMPANY_NAME: Your company name
- COMPANY_LOGO_URL: Company logo URL

## Testing

1. **Submit a Complaint**
   - Go to http://localhost:3000
   - Fill out the form
   - Check admin email for notification

2. **Admin Functions**
   - Go to http://localhost:3000/admin
   - View complaints
   - Update status
   - Delete complaints
   - Check email notifications

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string
   - Ensure MongoDB is running
   - Verify network access

2. **Email Not Working**
   - Check credentials
   - Use App Password for Gmail
   - Verify SMTP settings

3. **Build Errors**
   - Run 
pm install
   - Check TypeScript errors
   - Verify environment variables

### Support
- Check the README.md for detailed setup instructions
- Review error logs in browser console
- Check server logs for API errors
