<!-- # Fix Vercel Build Error: Missing `careers.slug` column

## Status: In Progress

### Steps:
- [x] Understand issue (Prisma schema has slug, migration exists, DB out of sync)
- [x] 1. Add Prisma migrate scripts to package.json
- [ ] 2. Run `npm run prisma:migrate` (deploys to prod DB)
- [ ] 3. Test `npm run build` locally
- [ ] 4. `git add . && git commit -m \"fix: add prisma migrate scripts & deploy slugs\" && git push`
- [ ] 5. Redeploy to Vercel & confirm build success

**Next steps (run manually):**
1. `npm run prisma:migrate`
2. `npm run build`
3. Git commit/push
4. Vercel redeploy -->
