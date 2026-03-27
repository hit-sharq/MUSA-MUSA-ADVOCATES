<!-- # Fix Blog Page Build Error - Next.js Client/Metadata Conflict

## Steps:
- [x] 1. Create TODO.md (done)
- [x] 2. Edit app/(public)/blog/page.tsx to server component (remove 'use client', add async Prisma fetch, pass posts to BlogClient)
- [x] 3. Edit app/(public)/blog/BlogClient.tsx (remove fetch logic, accept posts prop as BlogPost[])
- [x] 4. Run `npm run build` to verify fix ✓ Blog page compiles successfully (no metadata/use client error)
- [x] 5. Mark complete
 -->
