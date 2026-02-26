<!-- # 🏛️ Musa & Musa Advocates - Law Firm Website

A modern, professional law firm website built with Next.js, Tailwind CSS, and Prisma.

## Features

- **Homepage**: Professional law firm introduction with practice areas overview
- **About Us**: Firm history, mission, vision, and team information
- **Practice Areas**: Comprehensive list of legal services offered
- **Team/Attorneys**: Meet our legal professionals
- **Blog**: Legal insights and updates
- **Gallery**: Office and event photos
- **Contact**: Contact form with email notifications
- **Admin Dashboard**: Manage all content (blog, team, practice areas, gallery, testimonials, contact requests)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma with SQLite (easily switchable to PostgreSQL)
- **Authentication**: Clerk
- **Email**: Nodemailer
- **Image Upload**: Cloudinary

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```
bash
git clone <repository-url>
```

2. Install dependencies:
```
bash
npm install
```

3. Set up environment variables:
```
bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
DATABASE_URL="file:./dev.db"
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
ADMIN_USER_IDS=your_clerk_user_id
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
CONTACT_EMAIL=officialmutuku@gmail.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Initialize the database:
```
bash
npx prisma db push
```

6. Run the development server:
```
bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Panel

Access the admin dashboard at `/admin` after signing in. Features include:

- **Blog Management**: Create, edit, and delete blog posts
- **Team Management**: Add and manage attorney profiles
- **Practice Areas**: Update legal service offerings
- **Gallery**: Manage office images
- **Testimonials**: Handle client testimonials
- **Contact Requests**: View and manage inquiries

## License

---

By: *Joshua Mwendwa* -->
