const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Load environment variables if .env file exists
try {
  require('dotenv').config();
} catch (e) {
  console.log('No .env file found - using default configuration');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Angular Website Backend API' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields (name, email, message) are required'
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Log the contact form submission (in production, you'd save to database)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // Send email notification
    // NOTE: Email is temporarily disabled due to SMTP connectivity issues
    // All contact form data is logged to console below

    console.log('\n' + '='.repeat(50));
    console.log('🍀 NEW IRISH WEBSITE CONTACT SUBMISSION 🍀');
    console.log('='.repeat(50));
    console.log('📧 TO:        ', process.env.CONTACT_EMAIL || 'admin@yourwebsite.com');
    console.log('👤 FROM:      ', `"${name}" <${email}>`);
    console.log('📝 SUBJECT:   ', `Contact Form: Message from ${name}`);
    console.log('⏰ TIME:      ', new Date().toLocaleDateString('en-IE') + ' at ' + new Date().toLocaleTimeString('en-IE'));
    console.log('-'.repeat(50));
    console.log('👤 NAME:      ', name);
    console.log('📧 EMAIL:     ', email);
    console.log('💬 MESSAGE:');
    console.log('   ', message.replace(/\n/g, '\n    '));
    console.log('='.repeat(50));
    console.log('✅ CONTACT FORM DATA CAPTURED SUCCESSFULLY');
    console.log('='.repeat(50) + '\n');

    // Optional: Try to send email (but don't fail if it doesn't work)
    const shouldTryEmail = process.env.ENABLE_EMAIL === 'true';

    if (shouldTryEmail) {
      try {
        console.log('Email sending is enabled - attempting to send via Gmail...');

        // Debug Gmail credentials (safely)
        console.log('Gmail Debug Info:');
        console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'Set (' + process.env.EMAIL_USER + ')' : 'NOT SET');
        console.log('- EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length + ' characters' : 'NOT SET');
        console.log('- EMAIL_PASS starts with:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) + '...' : 'NOT SET');

        // Try multiple Gmail configurations
        const gmailConfigs = [
          {
            name: 'Gmail Service',
            config: {
              service: 'gmail',
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
              }
            }
          },
          {
            name: 'Gmail SMTP',
            config: {
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
              },
              tls: {
                rejectUnauthorized: false
              }
            }
          }
        ];

        let transporter = null;
        for (const gmailConfig of gmailConfigs) {
          try {
            console.log(`Trying ${gmailConfig.name}...`);
            transporter = nodemailer.createTransport(gmailConfig.config);
            await transporter.verify();
            console.log(`✅ ${gmailConfig.name} connection successful!`);
            break;
          } catch (verifyError) {
            console.log(`❌ ${gmailConfig.name} failed: ${verifyError.message}`);
            transporter = null;
          }
        }

        if (!transporter) {
          throw new Error('All Gmail configurations failed');
        }

        const mailOptions = {
          from: `"Irish Website Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
          subject: `🍀 Irish Website Contact: ${name} (${email})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff;">
              <div style="background-color: #28a745; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">🍀 New Contact from Irish Website</h2>
              </div>

              <div style="padding: 30px;">
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 5px solid #28a745;">
                  <h3 style="color: #28a745; margin-top: 0; font-size: 20px;">📧 Customer Contact Details:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #495057; width: 100px;">Name:</td>
                      <td style="padding: 8px 0; color: #212529; font-size: 16px;">${name}</td>
                    </tr>
                    <tr style="background-color: #e9ecef;">
                      <td style="padding: 8px 0; font-weight: bold; color: #495057;">Email:</td>
                      <td style="padding: 8px 0;">
                        <a href="mailto:${email}" style="color: #007bff; text-decoration: none; font-size: 16px; font-weight: bold;">
                          ${email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #495057;">Date:</td>
                      <td style="padding: 8px 0; color: #212529;">${new Date().toLocaleDateString('en-IE')} at ${new Date().toLocaleTimeString('en-IE')}</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #fff; border: 2px solid #dee2e6; border-radius: 8px; padding: 25px;">
                  <h3 style="color: #007bff; margin-top: 0; font-size: 18px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">💬 Customer Message:</h3>
                  <div style="line-height: 1.6; font-size: 16px; color: #212529; background-color: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #007bff;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>

                <div style="background-color: #e7f3ff; border-radius: 8px; padding: 20px; margin-top: 25px; text-align: center;">
                  <p style="margin: 0; color: #0056b3; font-weight: bold;">
                    📧 Click reply to respond directly to ${name} at ${email}
                  </p>
                  <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">
                    Or copy their email: ${email}
                  </p>
                </div>
              </div>

              <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #6c757d; font-size: 12px;">
                  This message was sent from the Irish Website contact form
                </p>
              </div>
            </div>
          `,
          replyTo: email
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully via Gmail!');

      } catch (emailError) {
        console.log('❌ Gmail email failed:', emailError.message);
        console.log('💡 Contact form data logged above for manual processing');
      }
    } else {
      console.log('📧 Email sending disabled - contact form data logged above');
    }

    res.status(200).json({
      message: 'Contact form submitted successfully',
      data: { name, email }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
});

// Email test endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('Testing email configuration...');

    const userEmail = process.env.EMAIL_USER || '';
    console.log('Email user:', userEmail ? userEmail : 'Not set');
    console.log('Email pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'Not set');

    // Test if we can create transporter
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.live.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test connection
    await transporter.verify();

    res.json({
      success: true,
      message: 'Email configuration is working!',
      emailUser: userEmail
    });

  } catch (error) {
    console.error('Email test failed:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      suggestion: 'Check your .env file and ensure EMAIL_USER and EMAIL_PASS are set correctly'
    });
  }
});

// Search endpoint (placeholder for future implementation)
app.get('/api/search', (req, res) => {
  const { q } = req.query;

  // Placeholder search results
  const searchResults = [
    { title: 'Sample Result 1', content: 'This is a sample search result' },
    { title: 'Sample Result 2', content: 'Another sample result' }
  ].filter(result =>
    result.title.toLowerCase().includes(q?.toLowerCase() || '') ||
    result.content.toLowerCase().includes(q?.toLowerCase() || '')
  );

  res.json({
    query: q,
    results: searchResults
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://192.168.0.14:${PORT}`);
});