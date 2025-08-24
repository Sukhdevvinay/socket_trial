# Frontend (Vercel) — Static Test Page

A minimal static HTML page that connects to your Render Socket.IO backend using the CDN client.

## Steps
1. Edit `index.html` and set:
   ```js
   const BACKEND_URL = "https://YOUR-RENDER-SERVICE.onrender.com";
   ```
2. Deploy this folder to **Vercel** as a static site.
3. Open the deployed URL, type a message, and you should see broadcasts echoed back.
