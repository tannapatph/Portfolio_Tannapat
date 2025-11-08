// api/contact.js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // บาง runtime req.body อาจเป็น string
  let payload = req.body;
  if (typeof payload === "string") {
    try { payload = JSON.parse(payload); } catch {}
  }

  const { name, email, message } = payload || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "missing fields" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",  // ใช้ได้เลย ไม่ต้อง verify โดเมน
      to: process.env.MY_EMAIL,
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${String(message).replace(/\n/g,'<br>')}</p>
      `
    });

    return res.status(204).end();
  } catch (e) {
    console.error("RESEND ERROR:", e);
    return res.status(500).json({ error: e?.message || "send failed" });
  }
}
