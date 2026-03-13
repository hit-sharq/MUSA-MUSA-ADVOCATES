<!-- # TODO: Fix Google Indexing Redirect Error

## Steps (Approved Plan Breakdown)

### 1. [✅] Align domains to www.musadvocates.co.ke in all SEO files
   - Edit app/layout.tsx (metadataBase, canonical, OG, jsonLd)
   - Edit app/sitemap.ts (baseUrl)
   - Edit app/robots.ts (baseUrl)

### 2. [✅] Verify/create /about route
   - Check app/(public)/about/page.tsx
   - Create if missing (redirect or content)

### 3. [✅] Update public/sitemap.xml
   - Fresh lastmod dates

### 4. [✅] Test locally
   - `npm run build && npm run start`
   - Check http://localhost:3000/sitemap.xml
   - Verify no redirect loops (curl -I)

### 5. [ ] Deploy & Configure
   - Vercel: Set NEXT_PUBLIC_SITE_URL=https://www.musadvocates.co.ke
   - Add redirect rule naked -> www

### 6. [ ] Validate
   - Google Search Console: Submit sitemap, request indexing
   - Test pages with Googlebot UA

**Progress: 0/6 complete**
 -->
