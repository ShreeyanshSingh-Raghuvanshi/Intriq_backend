const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const app = express();

// --- 1. CRITICAL HEADERS FOR RAZORPAY/GOOGLE AUTH POPOP ---
// These headers allow the popup to communicate back to your window without being blocked
// Allow all origins + specific allowed domains
const allowedOrigins = [
  "*",
  "https://intriq-frontend-8uj4.vercel.app",
  "http:localhost:5789"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// --- 3. ROUTES (Verify these match your api.js calls) ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/interview', require('./routes/interviewRoutes'));
app.use('/api/roadmap', require('./routes/roadmapRoutes'));
app.use('/api/premium', require('./routes/premiumRoutes')); // Handles flashcards/analysis
app.use('/api/payments', require('./routes/paymentRoutes')); // Handles /create-order and /verify
app.use('/health', 
  (req, res) => res.status(200).json({ status: "ok" })
); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
