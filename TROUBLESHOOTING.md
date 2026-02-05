
# Troubleshooting Log

## Issues Resolved
- **ArticleList.jsx Hook Error**: Moved `useMemo` before conditional return.
- **Prisma Client Sync**: Ran `npx prisma db push` to fix schema mismatch causing 500 errors.
- **Tailwind Config**: Removed CDN link from index.html and added `postcss.config.js`.

## Verification
- Backend API (`/api/articles`) is reachable and returning data.
- Database connection verified with `test-db.js`.
