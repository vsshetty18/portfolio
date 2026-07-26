import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

/* ============================================
   MIDDLEWARE
============================================ */
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)
app.use(express.json())

/* ============================================
   MAIL TRANSPORTER
============================================ */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/* ============================================
   HEALTH CHECK
============================================ */
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio backend is running' })
})

/* ============================================
   CONTACT ENDPOINT
============================================ */
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields (name, email, subject, message) are required.',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    })
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || 'vsvighnesh18@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Inter, sans-serif; color: #4A3527; max-width: 600px;">
          <h2 style="color: #6B4F3A;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #F5EFE6; padding: 16px; border-radius: 10px;">${message}</p>
        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    })
  } catch (error) {
    console.error('Email send error:', error.message)
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    })
  }
})

/* ============================================
   404 HANDLER
============================================ */
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' })
})

/* ============================================
   START SERVER
============================================ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
