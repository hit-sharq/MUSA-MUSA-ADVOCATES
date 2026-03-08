<!-- te_path>
/home/joshua/joshua/Musa&Musa Advocates/SITEMAP.md
</absolute_path>
<parameter name="content">
# Musa & Musa Advocates - Website Sitemap

**Website URL:** https://www.musadvocates.co.ke/

---

## Overview

This document provides a complete overview of the Musa & Musa Advocates website structure, including all public pages, admin panel routes, API endpoints, and database schemas.

---

## 1. Public Pages

| Route | Description | Priority |
|-------|-------------|----------|
| `/` | Homepage | 1.0 |
| `/about` | About Us | 0.8 |
| `/practice-areas` | Practice Areas | 0.9 |
| `/team` | Our Team | 0.8 |
| `/blog` | Legal Blog | 0.8 |
| `/gallery` | Gallery | 0.7 |
| `/careers` | Careers | 0.7 |
| `/contact` | Contact Us | 0.8 |

### Static Pages

| Route | Description |
|-------|-------------|
| `/privacy-policy` | Privacy Policy |
| `/terms-of-use` | Terms of Use |

---

## 2. Admin Panel Routes

The admin panel is accessible at `/admin` for authorized users.

### Dashboard
| Route | Description |
|-------|-------------|
| `/admin` | Admin Dashboard |

### Blog Management
| Route | Description |
|-------|-------------|
| `/admin/blog` | Blog Posts List |
| `/admin/blog/new` | Create New Blog Post |
| `/admin/blog/edit/[id]` | Edit Blog Post |

### Team Management
| Route | Description |
|-------|-------------|
| `/admin/team` | Team Members List |
| `/admin/team/new` | Add New Team Member |
| `/admin/team/edit/[id]` | Edit Team Member |

### Gallery Management
| Route | Description |
|-------|-------------|
| `/admin/gallery` | Gallery Images List |
| `/admin/gallery/new` | Add New Gallery Image |
| `/admin/gallery/edit/[id]` | Edit Gallery Image |

### Practice Areas Management
| Route | Description |
|-------|-------------|
| `/admin/practice-areas` | Practice Areas List |
| `/admin/practice-areas/new` | Add New Practice Area |
| `/admin/practice-areas/edit/[id]` | Edit Practice Area |

### Testimonials Management
| Route | Description |
|-------|-------------|
| `/admin/testimonials` | Testimonials List |
| `/admin/testimonials/new` | Add New Testimonial |
| `/admin/testimonials/edit/[id]` | Edit Testimonial |

### Careers Management
| Route | Description |
|-------|-------------|
| `/admin/careers` | Job Listings List |
| `/admin/careers/new` | Add New Job Listing |
| `/admin/careers/edit/[id]` | Edit Job Listing |

### Other Admin Pages
| Route | Description |
|-------|-------------|
| `/admin/contact-requests` | Contact Form Submissions |
| `/admin/profile` | Firm Profile Settings |

---

## 3. API Endpoints

### Public APIs

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/blog-posts` | GET, POST | Blog posts |
| `/api/team-members` | GET, POST | Team members |
| `/api/careers` | GET, POST | Job listings |
| `/api/contact` | POST | Contact form submission |
| `/api/practice-areas` | GET | Practice areas |
| `/api/search` | GET | Search functionality |
| `/api/testimonials` | GET | Client testimonials |
| `/api/upload` | POST | File uploads |

### Admin APIs

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/admin/blog` | GET, POST | Manage blog posts |
| `/api/admin/blog/[id]` | GET, PUT, DELETE | Single blog post |
| `/api/admin/team` | GET, POST | Manage team members |
| `/api/admin/team/[id]` | GET, PUT, DELETE | Single team member |
| `/api/admin/gallery` | GET, POST | Manage gallery |
| `/api/admin/gallery/[id]` | GET, PUT, DELETE | Single gallery item |
| `/api/admin/practice-areas` | GET, POST | Manage practice areas |
| `/api/admin/practice-areas/[id]` | GET, PUT, DELETE | Single practice area |
| `/api/admin/testimonials` | GET, POST, DELETE | Manage testimonials |
| `/api/admin/careers` | GET, POST | Manage careers |
| `/api/admin/careers/[id]` | GET, PUT, DELETE | Single career |
| `/api/admin/contact-requests` | GET, DELETE | Contact submissions |
| `/api/admin/contact-requests/[id]` | GET, DELETE | Single contact request |
| `/api/admin/profile` | GET, PUT | Firm profile |
| `/api/admin/check` | GET | Admin check |
| `/api/admin/upload-image` | POST | Image uploads |

---

## 4. Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `BlogPost` | Blog posts and articles |
| `TeamMember` | Team/attorneys information |
| `GalleryImage` | Gallery images |
| `PracticeArea` | Legal practice areas |
| `Testimonial` | Client testimonials |
| `Career` | Job postings |
| `ContactRequest` | Contact form submissions |
| `Profile` | Firm profile/bio |

---

## 5. SEO Configuration

### XML Sitemap
- **Location:** `/sitemap.xml`
- **Purpose:** Submitted to search engines (Google Search Console, Bing Webmaster Tools)

### Robots.txt
- **Location:** `/robots.txt`
- **Purpose:** Directs search engine crawlers

---

## 6. Site Architecture Diagram

```
                                    ┌─────────────────────────────────────┐
                                    │          PUBLIC PAGES              │
                                    │                                     │
┌───────────────────────────────────┼─────────────────────────────────────┤
│                                   │                                     │
│  ┌─────────┐  ┌─────────┐  ┌────┐ │ ┌─────────┐  ┌─────────┐  ┌─────┐ │
│  │  Home   │  │  About  │  │ Pr │ │ │  Team   │  │  Blog   │  │Gallery│ │
│  └────┬────┘  └────┬────┘  └──┬─┘ │ └────┬────┘  └────┬────┘  └──┬────┘ │
│       │            │           │   │      │            │          │      │
│       └────────────┴───────────┴───┴──────┴────────────┴──────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────────────────────────────────┐
                                    │          ADMIN PANEL               │
                                    │           (/admin)                  │
                                    │                                     │
┌───────────────────────────────────┼─────────────────────────────────────┤
│                                   │                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────┐│┌─────────┐  ┌──────────┐  ┌──────┐│
│  │Dashboard│  │  Blog   │  │Team │││ Gallery │  │Practice  │  │Testi-││
│  └─────────┘  └─────────┘  └─────┘││         │  │  Areas   │  │ monial││
│                                     │         │  └──────────┘  └──────┘│
│  ┌─────────┐  ┌─────────┐  ┌─────┐│┌─────────┐  ┌──────────┐          │
│  │ Careers │  │Contact  │  │Prof-│││         │  │          │          │
│  │         │  │Requests │  │ ile │││         │  │          │          │
│  └─────────┘  └─────────┘  └─────┘│└─────────┘  └──────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────────────────────────────────┐
                                    │            API LAYER                │
                                    │           (/api)                    │
                                    │                                     │
│  ┌───────────────────────────────┼───────────────────────────────────────┤
│  │      PUBLIC APIs              │         ADMIN APIs                   │
│  │                               │                                       │
│  │  /api/blog-posts      /api/  │  /api/admin/blog           /api/admin/│
│  │  /api/team-members   search  │  /api/admin/team           profile     │
│  │  /api/careers        upload  │  /api/admin/gallery        check       │
│  │  /api/contact        testi- │  /api/admin/practice-areas upload-image │
│  │  /api/practice-areas monials │  /api/admin/testimonials               │
│  │                               │  /api/admin/careers                   │
│  │                               │  /api/admin/contact-requests           │
│  └───────────────────────────────┴───────────────────────────────────────┘

                                    ┌─────────────────────────────────────┐
                                    │         DATABASE (Prisma)           │
                                    │                                     │
│  ┌───────────┐ ┌─────────┐ ┌──────┐│┌──────────┐ ┌────────────┐ ┌─────┐│
│  │ BlogPost │ │TeamMem- │ │Gall- │││Practice- │ │Testimonial │ │Care-││
│  │          │ │  ber    │ │eryIm-│││   Area   │ │            │ │ er  ││
│  └───────────┘ └─────────┘ └──────┘│└──────────┘ └────────────┘ └─────┘│
│                                      │                                    │
│  ┌───────────┐ ┌─────────────────────┐│                                    │
│  │ContactRe- │ │      Profile        ││                                    │
│  │  quest    │ │                     ││                                    │
│  └───────────┘ └─────────────────────┘│                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL with Prisma ORM |
| Authentication | Clerk |
| File Storage | Cloudinary |
| UI Components | shadcn/ui |

---

## 8. SEO Best Practices Implemented

1. ✅ XML Sitemap - For search engine crawling
2. ✅ Robots.txt - Directing search engine behavior
3. ✅ Semantic HTML structure
4. ✅ Meta tags and descriptions
5. ✅ Proper heading hierarchy (H1, H2, H3, etc.)
6. ✅ Alt text for images
7. ✅ Fast loading pages (Next.js optimization)
8. ✅ Mobile-friendly design
9. ✅ Clean URL structure
10. ✅ Priority signals in sitemap

---

**Last Updated:** January 2025
**Version:** 1.0 -->
