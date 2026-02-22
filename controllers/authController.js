const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth token validation (client-side token sent from frontend)
exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Google token required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        name,
        profilePicture: picture,
        googleId: sub,
        authProvider: 'google',
        // Initialize empty context
        profileContext: {
            skills: [],
            jobRole: '',
            experienceLevel: 'Entry Level',
            targetInterviewType: 'Technical'
        }
      });
      await user.save();
    } else {
      // Update profile metadata
      user.profilePicture = picture || user.profilePicture;
      user.googleId = sub;
      await user.save();
    }

    // Generate JWT token
    const appToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: appToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        profileContext: user.profileContext
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error.message);
    res.status(401).json({ error: 'Invalid or expired Google token.' });
  }
};

exports.saveContext = async (req, res) => {
  try {
    // Check if user ID is available (added by protect middleware)
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized user" });
    }

    const { skills, jobRole, experienceLevel, targetInterviewType } = req.body;
    let resumeUrl = '';

    // If a file was uploaded to Cloudinary, get the URL
    if (req.file && req.file.path) {
      resumeUrl = req.file.path;
    }

    // Parse skills if sent as stringified JSON or CSV
    let parsedSkills = [];
    if (typeof skills === 'string') {
        parsedSkills = skills.split(',').map(s => s.trim());
    } else if (Array.isArray(skills)) {
        parsedSkills = skills;
    }

    // Update user context
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      {
        profileContext: {
          resumeUrl: resumeUrl || undefined, // Only update if new file exists
          skills: parsedSkills,
          jobRole,
          experienceLevel,
          targetInterviewType
        }
      },
      { new: true }
    );

    res.json({ 
      success: true, 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Save Context Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getContext = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('profileContext');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.profileContext);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
