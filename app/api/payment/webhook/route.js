export const dynamic = 'force-dynamic';
const Stripe = require('stripe');
const { pool } = require('../../../../lib/db');
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

async function sendConfirmationEmail({ full_name, email, course_title, session_date, format, price }) {
  const dateStr = session_date ? new Date(session_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD';

  await transporter.sendMail({
    from: `"AgileEdge Training" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Registration Confirmed — ${course_title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:40px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <div style="background:#0B1629;padding:32px;text-align:center;">
            <div style="display:inline-block;background:#C9A84C;color:#0B1629;font-weight:900;font-size:18px;padding:8px 16px;border-radius:8px;letter-spacing:1px;">AE</div>
            <div style="color:#C9A84C;font-size:22px;font-weight:700;margin-top:12px;">AgileEdge</div>
            <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:4px;">Transform at Scale</div>
          </div>

          <div style="padding:40px 32px;">
            <div style="background:#D1FAE5;border-left:4px solid #10B981;padding:16px 20px;border-radius:8px;margin-bottom:32px;">
              <div style="color:#065F46;font-weight:700;font-size:16px;">✓ Registration Confirmed!</div>
              <div style="color:#065F46;font-size:14px;margin-top:4px;">Your payment was successful and your seat is reserved.</div>
            </div>

            <h2 style="color:#0B1629;font-size:20px;margin:0 0 8px;">Hello ${full_name},</h2>
            <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 32px;">
              Thank you for registering with AgileEdge. We're excited to have you join us for this training program.
            </p>

            <div style="background:#F8FAFC;border-radius:10px;padding:24px;margin-bottom:32px;">
              <div style="color:#0B1629;font-weight:700;font-size:16px;margin-bottom:16px;">📋 Registration Details</div>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:#64748B;font-size:14px;width:40%;">Course</td>
                  <td style="padding:8px 0;color:#0B1629;font-size:14px;font-weight:600;">${course_title}</td>
                </tr>
                <tr style="border-top:1px solid #E2E8F0;">
                  <td style="padding:8px 0;color:#64748B;font-size:14px;">Date</td>
                  <td style="padding:8px 0;color:#0B1629;font-size:14px;">${dateStr}</td>
                </tr>
                <tr style="border-top:1px solid #E2E8F0;">
                  <td style="padding:8px 0;color:#64748B;font-size:14px;">Format</td>
                  <td style="padding:8px 0;color:#0B1629;font-size:14px;">${format || 'TBD'}</td>
                </tr>
                <tr style="border-top:1px solid #E2E8F0;">
                  <td style="padding:8px 0;color:#64748B;font-size:14px;">Amount Paid</td>
                  <td style="padding:8px 0;color:#0B1629;font-size:14px;font-weight:600;">$${price || 'N/A'}</td>
                </tr>
              </table>
            </div>

            <div style="background:#FFF9EC;border-radius:10px;padding:24px;margin-bottom:32px;">
              <div style="color:#92400E;font-weight:700;font-size:15px;margin-bottom:8px;">📌 What happens next?</div>
              <ul style="color:#78350F;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">