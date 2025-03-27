require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Sender's Email
    pass: process.env.PASSWORD, // App Password
  },
});

// Function to format questions & answers based on selected roles
const formatQA = (selectedRoles, questions, answers) => {
  let formattedQA = "";
  
  selectedRoles.forEach((role) => {
    if (questions[role]) {
      formattedQA += `<h3>Role: ${role}</h3><ul>`;
      questions[role].forEach((question, index) => {
        const answer = answers[role] && answers[role][index] ? answers[role][index] : "Not Answered";
        formattedQA += `<li><b>${question}:</b> ${answer}</li>`;
      });
      formattedQA += "</ul>";
    }
  });

  return formattedQA || "<p>No questions answered.</p>";
};

// Email Sending Endpoint
app.post("/form-submit", async (req, res) => {
  const { name, rollNo, email, mobNo, selectedRoles, questions, answers } = req.body;

  // Format selected roles
  const rolesText = selectedRoles.length ? selectedRoles.join(", ") : "None";

  // Construct email message
  const message = `
    <h2>Hello ${name},</h2>
    <p>Your response has been successfully submitted! Below are the details:</p>
    <ul>
      <li><b>Roll Number:</b> ${rollNo}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>Mobile Number:</b> ${mobNo}</li>
      <li><b>Selected Roles:</b> ${rolesText}</li>
    </ul>
    <h3>Your Answers:</h3>
    ${formatQA(selectedRoles, questions, answers)}
    <br>
    <p>Best regards,</p>
    <p>Your Team</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Confirmation of Your Submission",
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.get("/fetch-fbzx", async (req, res) => {
  try {
    const formUrl = req.query.url; // Get form URL from frontend
    const response = await axios.get(formUrl); // Fetch Google Form HTML
    
    // Extract fbzx token using regex
    console.log(response)
    const fbzxMatch = response.data.match(/name="fbzx" value="([^"]+)"/);
    if (fbzxMatch) {
      res.json({ fbzx: fbzxMatch[1] });
    } else {
      res.status(400).json({ error: "fbzx token not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the form" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
