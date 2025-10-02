# PCDA Coach Portal — Starter (Next.js + Supabase)

This minimal starter gives you:
- Email magic-link login for coaches (Supabase Auth)
- Protected dashboard that lists published `updates`
- Simple landing page

## 0) Prereqs
- Node 18+
- GitHub account
- Vercel account
- Supabase project

## 1) Local setup
```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```
Open http://localhost:3000

## 2) Supabase setup
1. Create a new project → copy **Project URL** and **anon key** into `.env.local`.
2. SQL Editor → run `supabase.sql` from this repo.
3. Auth → Settings: enable **Email** (magic links/OTP).
4. (Optional) Auth site URL → set your Vercel domain once you deploy.

## 3) GitHub + Vercel
```bash
git init
git add .
git commit -m "PCDA starter"
# If you have GitHub CLI:
gh repo create pcda-coach-portal --public --source=. --remote=origin --push
# OR create a repo on GitHub and push:
# git remote add origin https://github.com/<you>/pcda-coach-portal.git
# git branch -M main
# git push -u origin main
```
- In **Vercel**, click **New Project → Import** the GitHub repo.
- Add env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_APP_BASE_URL` (e.g., https://coaches.yourdomain.com)
- Deploy. Map your domain to Vercel.

## 4) Seeding sample data
Use the Supabase **SQL Editor** and run `seed.sql`. Then visit `/dashboard` after logging in.

## 5) Where to edit
- Landing: `app/page.tsx`
- Login: `app/login/page.tsx`
- Dashboard: `app/dashboard/page.tsx`
- Supabase client: `lib/supabaseClient.ts`

## Next steps
- Add player filters and richer UI.
- Connect mailing (Resend/Mailchimp) and an admin publish screen.
- Later: Athlete Premium with Stripe.
