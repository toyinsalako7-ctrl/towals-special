# TOWALS SPECIAL — website starter

A responsive static website starter with:
- Mobile navigation
- Marketplace links to Oraimo, Temu and Jumia
- Entertainment discovery cards
- Community listing form with optional image
- Search/filter for listings
- Ad placement placeholders
- Vercel-ready static deployment

## Preview
Open `index.html` in a browser.

## Deploy on Vercel
1. Upload these files to a GitHub repository.
2. Import the repository in Vercel.
3. Select Framework Preset: **Other**.
4. Leave Build Command blank; set Output Directory to `.`.
5. Deploy.

## Important limitations
Uploads are currently stored in the visitor's browser using localStorage. They do not appear on other devices. This is a front-end demo, not a live multi-user marketplace. For public uploads, add Supabase Auth, a database table, Supabase Storage, row-level security, server-side validation, spam controls and admin moderation. Never expose a Supabase service-role key in browser code.

The ad boxes are placeholders. Add AdSense code only after site approval. Add privacy policy, terms, contact details, reporting and affiliate disclosures before public launch.
