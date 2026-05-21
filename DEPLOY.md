# Deploy ደህንነት to Vercel (100% checklist)

## Fastest: one click (recommended)

1. Click **Deploy with Vercel** in [README.md](./README.md), or run:

   ```powershell
   .\deploy.ps1
   ```

2. Sign in with **GitHub** → authorize Vercel.

3. Confirm settings:
   - **Project Name:** `dehinet-cyber` (required — do not use `-cyber`)
   - **Root Directory:** `.` (default)
   - **Framework:** Next.js

4. Click **Deploy** → open **https://dehinet-cyber.vercel.app**

---

## Why you saw `DEPLOYMENT_NOT_FOUND`

- Wrong or expired deployment link
- Project name started with `-` (invalid URL)
- **Root Directory** was set to `cyber-app` (old layout — now fixed at repo root)

---

## Optional: auto-deploy on every push (GitHub Actions)

1. Create a token: [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create** → copy token.

2. On GitHub: [github.com/Nahom-Abraham-Jr/-Cyber/settings/secrets/actions](https://github.com/Nahom-Abraham-Jr/-Cyber/settings/secrets/actions) → **New repository secret**:
   - Name: `VERCEL_TOKEN`
   - Value: your token

3. First deploy from the dashboard (steps above), then in Vercel → Project → **Settings** → copy:
   - `VERCEL_ORG_ID` → GitHub secret `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID` → GitHub secret `VERCEL_PROJECT_ID`

4. Push to `main` — workflow `.github/workflows/vercel-deploy.yml` deploys automatically.

---

## Custom domain `ደህንነት.com`

Buy the IDN domain from a registrar, then Vercel → **Domains** → add DNS records.
