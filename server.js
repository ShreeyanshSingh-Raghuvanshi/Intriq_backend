// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const passport = require('passport');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
// app.use(express.json());
// app.use(passport.initialize());

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/resume', require('./routes/resumeRoutes'));
// app.use('/api/interview', require('./routes/interviewRoutes'));
// app.use('/api/premium', require('./routes/premiumRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Make sure to npm install cors
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();

// // --- CRITICAL CORS SETUP ---
// app.use(cors({ 
//   origin: "http://localhost:5173", // URL of your React Frontend (Vite default)
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"]
// }));

// app.use(express.json());

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch(err => console.error("MongoDB Connection Error:", err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/interview', require('./routes/interviewRoutes')); // Ensure this file exists
// app.use('/api/roadmap', require('./routes/roadmapRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











// // - Fixed CORS and added COOP headers
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const passport = require('passport');

// dotenv.config();
// const app = express();

// // --- CRITICAL HEADERS FOR POPUPS (Razorpay/Google Auth) ---
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });

// // --- CORS SETUP ---
// app.use(cors({ 
//   origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
// }));

// app.use(express.json());
// app.use(passport.initialize());

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch(err => console.error("MongoDB Connection Error:", err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/interview', require('./routes/interviewRoutes')); 
// app.use('/api/roadmap', require('./routes/roadmapRoutes'));
// app.use('/api/premium', require('./routes/premiumRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/resume', require('./routes/resumeRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));