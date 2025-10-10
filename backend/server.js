const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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

    // Optional: Send email notification
    // Uncomment and configure the following section if you want to send emails
    /*
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    });

    const mailOptions = {
      from: email,
      to: 'your-email@gmail.com',
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    */

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});