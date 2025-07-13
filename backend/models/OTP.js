const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // expires after 5 mins
  },
});

async function sendVerificationEmail(email, otp) {
	// Send the email
  const mailBody = `
      <h2>OTP</h2>
      <p>Enter the given OTP to Procede</p>
      ${otp}
      <p>This otp will expire in 6 minutes.</p>
    `;
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			otp
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {
  
  // Only send an email when a new document is created
	if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
	}
  console.log("New document saved to database");
	next();
});

module.exports = mongoose.model("OTP", otpSchema);
