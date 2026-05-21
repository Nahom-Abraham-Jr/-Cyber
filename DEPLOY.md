# Deploy to Vercel (Free) via GitHub

Your app **builds successfully** and is ready to deploy.

## What you get on the free plan

| Option | Cost | Example |
|--------|------|---------|
| **Vercel subdomain** | Free | `dehinet-cyber.vercel.app` |
| **Custom domain** `ደህንነት.com` | You must **buy** the domain (~$10–15/year) | Connect in Vercel → Domains |

Vercel does **not** give away free `.com` names. The Ethiopic name **ደህንነት** (“security”) as a `.com` must be purchased from a registrar that supports **IDN** (internationalized) domains, then linked in Vercel.

**Recommended free URL:** name the Vercel project `dehinet-cyber` → **https://dehinet-cyber.vercel.app**

---

## Step 1 — Push code to GitHub ✅ Done

Code is live at **[github.com/Nahom-Abraham-Jr/-Cyber](https://github.com/Nahom-Abraham-Jr/-Cyber)**.

> The Next.js app is at the **repository root** (no subfolder needed on Vercel).

---

## Step 2 — Deploy on Vercel (Hobby / free)

1. Go to [https://vercel.com/signup](https://vercel.com/signup) → **Continue with GitHub**
2. Authorize Vercel to access your GitHub account
3. Go to [https://vercel.com/new](https://vercel.com/new)
4. **Import** the repository `-Cyber`
5. Settings (important for this repo layout):
   - **Framework Preset:** Next.js
   - **Root Directory:** `.` (leave as default — app is at repo root)
   - **Build Command:** `npm run build` (default)
   - **Output:** (auto)
6. **Project Name:** `dehinet-cyber` (this becomes your `.vercel.app` URL)
7. Click **Deploy**

Wait ~2 minutes. Your site will be live at:

**https://dehinet-cyber.vercel.app**

Every `git push` to `main` will redeploy automatically.

---

## Step 3 (optional) — Custom domain `ደህንነት.com`

1. **Buy** the domain from a registrar that supports Ethiopic IDN, e.g.:
   - [Namecheap](https://www.namecheap.com) — search for `ደህንነት.com` or punycode form
   - [GoDaddy](https://www.godaddy.com), [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
2. In [Vercel Dashboard](https://vercel.com) → your project → **Settings** → **Domains**
3. Add `ደህንነት.com` (Vercel shows DNS records)
4. At your domain registrar, add the DNS records Vercel provides (usually `A` + `CNAME` for `www`)
5. Wait for DNS (minutes to 48 hours). SSL is automatic on Vercel.

**ASCII alternative** (easier and cheaper): buy `dehinet.com` or `dehinet.et` and point it the same way.

---

## Optional environment variable

Breach simulator uses Have I Been Pwned (optional):

| Name | Where |
|------|--------|
| `NEXT_PUBLIC_HIBP_API_KEY` | Vercel → Project → **Settings** → **Environment Variables** |

Without it, breach features may be limited; the rest of the app still works.

---

## Troubleshooting

- **Build fails on Vercel:** Set **Root Directory** to `.` (repo root, where `package.json` lives).
- **Vercel CLI login error (certificate):** Use the **web dashboard** (steps above) instead of `vercel login` in the terminal.
