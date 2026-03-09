export const dynamic = 'force-dynamic';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const { to, name, courseName, sessionDate } = await req.json();

  await transporter.sendMail({
    from: `"AgileEdge" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Enrollment Confirmed: ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1629; padding: 24px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0;">AgileEdge</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0;">Transform at Scale</p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <h2 style="color: #0B1629;">Hi ${name},</h2>
          <p>Your enrollment in <strong>${courseName}</strong> is confirmed!</p>
          <div style="background: #F5EDD6; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0;"><strong>Course:</strong> ${courseName}</p>
            <p style="margin: 8px 0 0;"><strong>Date:</strong> ${sessionDate}</p>
          </div>
          <p>Pre-course materials will be sent 7 days before the session.</p>
          <p>If you have any questions reply to this email.</p>
          <p>See you in class!<br><strong>AgileEdge Team</strong></p>
        </div>
        <div style="background: #0B1629; padding: 16px; text-align: center;">
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
            AgileEdge · training@optim-soln.com
          </p>
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}