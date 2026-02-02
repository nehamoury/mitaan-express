# PLAN: Bilingual Blog & Article System

## 1. Requirement Analysis
**Goal:** Enable Admin to post articles in specific languages (English/Hindi) and display them correctly on the Blogs page based on user preference.

**User Constraints:**
- Admin panel must allow selecting language (Hindi/English) when creating/editing.
- Blogs page must fetch/display data.
- User explicitly asked for "select" functionality for language.

## 2. Architecture Changes

### A. Database (Prisma)
- **Modify `Article` model:**
  - Add `language` field (String or Enum: 'hi' | 'en').
  - Default to 'en'.

### B. Backend (Node/Express)
- **Controller (`article.controller.js`):**
  - Accept `language` in `createArticle` and `updateArticle`.
  - Update `getArticles` to support `?lang=en` or `?lang=hi` query param.
- **Validation:**
  - Ensure `language` is valid.

### C. Frontend (React/Vite)
- **Admin Panel (`ArticleEditor`):**
  - Add a Language Selector (Select Input: English | Hindi).
  - Send selected language to API.
- **Public Page (`BlogsPage`):**
  - Fetch articles with `lang=${currentLanguage}` param.
  - Show loading state while fetching.
  - Use real data instead of mock `blogPosts`.

## 3. Implementation Steps

### Phase 1: Database & Backend (Agent: `backend-specialist`)
1.  Update `server/prisma/schema.prisma` to add `language` field.
2.  Run `npx prisma migrate dev`.
3.  Update `server/controllers/article.controller.js` to handle `language`.

### Phase 2: Admin Panel (Agent: `frontend-specialist`)
1.  Modify `src/components/admin/ArticleEditor.jsx` (or equivalent page) to include Language dropdown.
2.  Ensure it saves correctly.

### Phase 3: Public UI (Agent: `frontend-specialist`)
1.  Update `src/pages/BlogsPage.jsx` to fetch real data from `/api/articles?category=blog&lang=...`.
2.  Use `useEffect` to refetch when language changes.

## 4. Verification Plan
- **Test 1:** Create an English article -> Appears in English view?
- **Test 2:** Create a Hindi article -> Appears in Hindi view?
- **Test 3:** Switch Public UI language -> Content updates?
