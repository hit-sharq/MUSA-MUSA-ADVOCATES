import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Save to database (with fallback for database issues)
    let contactRequest
    try {
      contactRequest = await prisma.contactRequest.create({
        data: {
          name,
          email,
          phone: phone || "",
          company: company || "",
          subject,
          message,
        },
      })
    } catch (dbError) {
      console.warn("Database save failed, proceeding with email only:", dbError)
      // Create a mock contact request object for email purposes
      contactRequest = {
        id: `temp-${Date.now()}`,
        name,
        email,
        phone: phone || "",
        company: company || "",
        subject,
        message,
        createdAt: new Date(),
      }
    }

    // Send email to Musa & Musa Advocates
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 2rem; text-align: center;">
          <h1>📧 New Contact Request</h1>
          <p>You have received a new message through your website</p>
        </div>

        <div style="padding: 2rem; background: #f7fafc;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1a365d; margin-bottom: 1.5rem;">📋 Contact Details</h2>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 6px; margin-bottom: 1.5rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <strong style="color: #2d3748;">👤 Name:</strong><br>
                  <span style="color: #4a5568;">${name}</span>
                </div>

                <div>
                  <strong style="color: #2d3748;">📧 Email:</strong><br>
                  <span style="color: #4a5568;">${email}</span>
                </div>

                ${phone ? `
                <div>
                  <strong style="color: #2d3748;">📞 Phone:</strong><br>
                  <span style="color: #4a5568;">${phone}</span>
                </div>
                ` : '<div></div>'}

                ${company ? `
                <div>
                  <strong style="color: #2d3748;">🏢 Company:</strong><br>
                  <span style="color: #4a5568;">${company}</span>
                </div>
                ` : '<div></div>'}
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <strong style="color: #2d3748;">⚖️ Legal Matter:</strong><br>
              <span style="color: #4a5568; background: #edf2f7; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block; margin-top: 0.25rem;">${subject}</span>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <strong style="color: #2d3748;">💬 Message:</strong>
              <div style="background: #f7fafc; padding: 1.5rem; border-radius: 6px; margin-top: 0.5rem; border-left: 4px solid #1a365d;">
                <div style="color: #2d3748; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>

            <div style="background: #e6fffa; padding: 1rem; border-radius: 6px; border-left: 4px solid #38a169;">
              <strong style="color: #2f855a;">📅 Received:</strong> ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}<br>
              <strong style="color: #2f855a;">🆔 Request ID:</strong> ${contactRequest.id}
            </div>
          </div>
        </div>

        <div style="background: #1a365d; color: white; padding: 1.5rem; text-align: center;">
          <p style="margin: 0; font-size: 1.1rem; font-weight: 600;">⚖️ Musa & Musa Advocates</p>
          <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Professional Legal Services | Nairobi, Kenya</p>
        </div>
      </div>
    `

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "officialmutuku@gmail.com",
      subject: `New Contact Request: ${subject}`,
      html: emailHtml,
      replyTo: email,
    })

    // Send confirmation email to client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 2rem; text-align: center;">
          <h2>Musa & Musa Advocates</h2>
          <h3>📧 Contact Request Received</h3>
          <p>We have received your message and will respond within 24 hours</p>
        </div>
        
        <div style="padding: 2rem; background: #f7fafc;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to Musa & Musa Advocates. We have received your message regarding "${subject}" and will review it promptly.</p>
            
            <p>Our team typically responds to all inquiries within 24 hours during business days. If your matter is urgent, please don't hesitate to call us directly at <strong>+254 758 251 399</strong>.</p>
            
            <div style="background: #f7fafc; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
              <h3 style="color: #1a365d; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</p>
            </div>
            
            <p>We appreciate your interest in our legal services and look forward to assisting you.</p>
            
            <p>Best regards,<br>
            <strong>Musa & Musa Advocates</strong></p>
          </div>
        </div>
        
        <div style="background: #1a365d; color: white; padding: 1rem; text-align: center;">
          <p style="margin: 0;">📧 officialmutuku@gmail.com | 📞 +254 758 251 399</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Musa & Musa Advocates",
      html: confirmationHtml,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        id: contactRequest.id,
        dbSaved: !contactRequest.id.startsWith('temp-'),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing contact request:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again or contact us directly." },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to last 50 requests
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contact requests:", error)
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 })
  }
}
