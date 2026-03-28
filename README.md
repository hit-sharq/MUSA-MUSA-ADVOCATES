# Musa & Musa Advocates 🚀

Professional law firm website built with **Next.js 15 App Router**, **Prisma**, **TailwindCSS**, **Clerk Auth**, and **Cloudinary**. Live at [musadvocates.co.ke](https://www.musadvocates.co.ke).

[![Next.js](https://img.shields.io/badge/Next.js-15.2.8-black.svg?logo=next.js)](https://nextjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-6.8.2-blue.svg?logo=prisma)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue.svg?logo=tailwind)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black.svg?logo=vercel)](https://vercel.com)

## ✨ Features

- **Public Pages**: Home, About, Team, Practice Areas, Gallery, Blog, Careers, Contact
- **Admin Dashboard** (`/admin`): Full CRUD for Blog, Careers, Team, Gallery, Practice Areas, Testimonials, Contact Requests
- **Contact Form**: Auto-saves to DB + sends HTML emails (Gmail SMTP)
- **SEO Optimized**: Metadata, Sitemap, OpenGraph, Schema.org JobPosting
- **Responsive**: Mobile-first Tailwind + shadcn/ui components
- **Auth**: Clerk for admin login
- **Database**: PostgreSQL (Prisma) - Vercel Postgres compatible
- **Images**: Cloudinary CDN
- **Search**: Full-text blog search

## 🛠 Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd Musa&Musa Advocates
npm install
```

### 2. Environment Variables (`.env.local`)
```env
# Database (Vercel Postgres connection string)
DATABASE_URL="postgresql://..."

# Clerk Auth (https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# Email (Gmail App Password required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM="Musa & Musa <your-email@gmail.com>"
CONTACT_EMAIL=officialmutuku@gmail.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

**Gmail Setup**: [Generate App Password](https://myaccount.google.com/apppasswords) (2FA + Mail app → 16-char code)

### 3. Database Setup
```bash
npm run prisma:migrate    # Deploy migrations (slugs, etc.)
npm run prisma:generate   # Generate Prisma Client
npm run prisma:studio     # View data (http://localhost:5555)
```

### 4. Development
```bash
npm run dev    # http://localhost:5000
```

### 5. Build & Deploy
```bash
npm run build  # Tests prebuild migrate
npm run start  # Production server
```
**Vercel**: Auto-deploys with `prebuild: prisma generate && prisma migrate deploy`

## 📁 Project Structure

```
app/
├── (public)/          # Landing pages
│   ├── careers/[slug]/page.tsx
│   ├── blog/page.tsx
│   └── contact/page.tsx
├── admin/             # Dashboard (Clerk protected)
│   ├── careers/page.tsx
│   ├── blog/new/page.tsx
│   └── team/edit/[id]/page.tsx
├── api/               # REST endpoints
│   ├── admin/upload-image/route.ts
│   └── contact/route.ts
prisma/schema.prisma   # Models: Career, BlogPost, TeamMember, etc.
components/ui/         # shadcn/ui components
lib/prisma.ts          # Prisma singleton
```

## 🧑‍💼 Admin Panel (/admin)

**Login**: Clerk dashboard → Test users or create.

**CRUD Operations**:
| Section | Create | Edit | List | Delete |
|---------|--------|------|------|--------|
| Blog | ✅ | ✅ | ✅ | API |
| Careers | ✅ | ✅ | ✅ | API |
| Team | ✅ | ✅ | ✅ | API |
| Gallery | ✅ | ✅ | ✅ | ✅ |
| Practice Areas | ✅ | ✅ | ✅ | API |
| Testimonials | ✅ | ✅ | ✅ | API |
| Contact Requests | View | Mark Read | ✅ | API |

**Image Upload**: Cloudinary direct to admin/upload-image

## 🔧 Recent Fixes & Scripts

```bash
npm run prisma:migrate     # ✅ Fixed careers.slug DB error
npm run prisma:db-push     # Force schema sync
npm run prisma:studio      # DB browser
```

## 🚀 Deployment Checklist

- [ ] `.env` vars in Vercel dashboard
- [ ] `npm run prisma:migrate` (prod DB)
- [ ] `npm run build` (local test)
- [ ] Push to main → Vercel auto-build

## 🤝 Contributing

1. Fork & PR
2. `npm run lint` before push
3. Update Prisma: `npx prisma db pull && prisma migrate dev`

## 📞 Contact

**Musa & Musa Advocates**  
Nairobi, Kenya  
+254 758 251 399  
officialmutuku@gmail.com

---

**Built with ❤️ for legal excellence** ⚖️✨
