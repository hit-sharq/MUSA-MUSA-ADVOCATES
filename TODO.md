<!-- # Fix Noindex Issue - Steps

## Status: [IN PROGRESS]

### 1. [ ] Setup
- Create env var NEXT_PUBLIC_SITE_URL=https://musadvocates.co.ke

### 2. [ ] Core Config Updates
- [ ] Update app/layout.tsx (domain consistency, env var)
- [ ] Update app/robots.ts (use env var)
- [ ] Update app/sitemap.ts (strict published:true filters)

### 3. [ ] Metadata Fixes
- [ ] app/admin/layout.tsx: Add robots: {noindex: true}
- [ ] All public page.tsx: Add explicit robots: {index: true, follow: true}

### 4. [ ] Dynamic Pages
- [ ] app/(public)/blog/[slug]/page.tsx
- [ ] app/(public)/practice-areas/[id]/page.tsx (if exists)
- [ ] Similar for team/careers

### 5. [ ] Config Check
- [ ] vercel.json: Headers/rewrites

### 6. [ ] Test & Deploy
- [ ] npm run build && npm run start
- [ ] curl -I https://musadvocates.co.ke/ | grep robots
- [ ] Validate sitemap/robots.txt
- [ ] Resubmit GSC sitemap
- [ ] Monitor GSC indexing report

**Next: Update layout.tsx**
 -->
