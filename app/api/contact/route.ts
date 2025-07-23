export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json()

        // Backend validation
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 })
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amirmehboob921@gmail.com',
                pass: 'nflu jyyk fauc baey',
            },
        })

        // Email options
        const mailOptions = {
            from: 'amirmehboob921@gmail.com',
            to: process.env.EMAIL_TO || 'amirmehboob921@gmail.com',
            subject: `Portfolio Contact Form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
} 