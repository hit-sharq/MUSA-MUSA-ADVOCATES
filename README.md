# 🏛️ Musa Mutuku & Associates - Law Firm Website
By: -*joshua mwendwa*-
A modern, professional law firm website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features a comprehensive admin panel for content management and a responsive design optimized for legal professionals.

![Law Firm Website](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## ✨ Features

### 🌐 **Public Website**
- **Modern Homepage** - Hero section, practice areas, team showcase, testimonials
- **About Page** - Comprehensive firm information, education, and experience
- **Practice Areas** - Detailed legal service descriptions
- **Team Directory** - Professional profiles with photos and expertise
- **Blog System** - Legal articles and news with rich content
- **Gallery** - Photo gallery of firm events and achievements
- **Contact Form** - Professional contact with email integration
- **Search Functionality** - Site-wide search across all content
- **Testimonials** - Client reviews with star ratings
- **Mobile Responsive** - Optimized for all devices

### 🔐 **Admin Panel**
- **Dashboard** - Statistics and quick actions overview
- **Content Management** - Full CRUD operations for all content
- **Blog Management** - Rich text editor for articles
- **Team Management** - Staff profiles and credentials
- **Practice Areas** - Service descriptions and details
- **Gallery Management** - Image uploads with Cloudinary integration
- **Contact Requests** - View and manage client inquiries
- **Testimonials** - Client review management system
- **Image Uploads** - Cloudinary integration for media management
- **Mobile Optimized** - Responsive admin interface

### 🛡️ **Legal Compliance**
- **Privacy Policy** - Comprehensive privacy protection
- **Terms of Use** - Legal disclaimers and usage terms
- **Professional Standards** - Law Society of Kenya compliance
- **Attorney-Client Privilege** - Confidentiality protections
- **Error Pages** - Professional 404 and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Cloudinary account (for image uploads)
- SMTP email service

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/mutuku-moses-law-firm.git
   cd mutuku-moses-law-firm
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configure your \`.env.local\` file:**
   \`\`\`env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/lawfirm"
   
   # Admin Authentication
   ADMIN_USER_IDS="admin@example.com,admin2@example.com"
   
   # Email Configuration
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   SMTP_FROM="noreply@lawfirm.com"
   CONTACT_EMAIL="contact@lawfirm.com"
   
   # Cloudinary (Image Uploads)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   \`\`\`

5. **Set up the database**
   \`\`\`bash
   npx prisma migrate dev
   npx prisma generate
   \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
├── app/
│   ├── (public)/           # Public pages
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── practice-areas/
│   │   ├── privacy-policy/
│   │   ├── terms-of-use/
│   │   └── team/
│   ├── admin/              # Admin panel
│   │   ├── blog/
│   │   ├── contact-requests/
│   │   ├── gallery/
│   │   ├── practice-areas/
│   │   ├── team/
│   │   └── testimonials/
│   ├── api/                # API routes
│   │   ├── admin/
│   │   ├── contact/
│   │   ├── search/
│   │   └── testimonials/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── admin/              # Admin components
│   ├── ui/                 # shadcn/ui components
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   └── TestimonialsSection.tsx
├── lib/
│   ├── auth.ts             # Authentication
│   ├── cloudinary.ts       # Image uploads
│   ├── prisma.ts           # Database client
│   └── utils.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
└── public/
    ├── images/
    └── favicon.ico
\`\`\`

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **Nodemailer** - Email sending

### **Services**
- **Cloudinary** - Image storage and optimization
- **Vercel** - Deployment platform (recommended)

## 🔧 Configuration

### Admin Access
Add admin email addresses to the \`ADMIN_USER_IDS\` environment variable:
\`\`\`env
ADMIN_USER_IDS="admin@lawfirm.com,partner@lawfirm.com"
\`\`\`

### Email Setup
Configure SMTP settings for contact form emails:
\`\`\`env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
\`\`\`

### Image Uploads
Set up Cloudinary for image management:
\`\`\`env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
\`\`\`

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Key Mobile Features:
- Touch-friendly navigation
- Optimized admin panel for mobile
- Responsive images and galleries
- Mobile-first contact forms

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔒 Security Features

- **Input Validation** - All forms validated and sanitized
- **CSRF Protection** - Cross-site request forgery prevention
- **Admin Authentication** - Email-based admin access control
- **Rate Limiting** - API endpoint protection
- **Secure Headers** - Security headers configuration

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google rankings
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Static and dynamic content caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

MIT License

Copyright (c) 2025 joshua mwendwa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## 🆘 Support

For support and questions:
- **Email**: officialjoshuamwendwa@gmail.com
- **Phone**: +254 794 773 452
- **WhatsApp**: +254 792 687 584
- **instagram**: @J_lee087
- **Twitter**: @j_l_e_e087
- **GitHub**: @hit-sharq
- **LinkedIn**: https://www.linkedin.com/in/lee-joshua-b183b5287/
- **Issues**: [GitHub Issues](https://github.com/hit-sharq/Mutuku-Moses/tree/main/issues)

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent deployment platform

---
**Built with ❤️ for legal professionals**

*© 2025 Musa & Associates. All rights reserved.*
