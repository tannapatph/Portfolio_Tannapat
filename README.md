# My Personal Website

A simple static portfolio built with HTML/CSS/JS. The contact form submits to a Google Apps Script Web App and logs messages to Google Sheets with auto-reply via Gmail.

## Live
- URL: https://tannapat-website.vercel.app/

## Features
- Responsive layout
- Contact form → Google Apps Script → Google Sheets
- Auto-reply email to the sender

## Contact Form (How it works)
- Frontend posts `name`, `email`, `message` to your Apps Script Web App URL using `application/x-www-form-urlencoded`.
- Apps Script appends rows to the `<SHEET_NAME>` sheet in `<SHEET_ID>` and emails both the site owner and the sender.

## Setup

1. **Apps Script**
   - Create a new project, paste the code from `apps-script/Code.gs`.
   - Set `SHEET_ID`, `SHEET_NAME`, `OWNER_EMAIL`.
   - Deploy → **Web app** → *Execute as:* Me, *Who has access:* Anyone.
   - Copy the **Web App URL**.

2. **Frontend**
   - In `index.html`, set:
     ```html
     <script>
       const SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
     </script>
     ```
   - Ensure your form has fields with `name="name"`, `name="email"`, `name="message"`.

3. **Deploy**
   - Push to GitHub/Pages or Vercel/Cloudflare as a static site (no build step).

## Development
- Open with Live Server or any static server.
- Check browser console/network for a `200` response and `{ "ok": true }`.

## Folder Structure
```text
.
├─ index.html
├─ images
├─ css
|   └─ style.css
├─ main.js
└─ apps-script/
   └─ Code.gs   # Google Apps Script source
