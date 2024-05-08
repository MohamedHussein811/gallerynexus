const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
async function sendRegistrationEmail(userEmail, activation_code) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "drifterpaki@gmail.com",
        pass: "cqviivogyziarzdr",
      },
    });

    const info = await transporter.sendMail({
      from: '"Gallery Nexus" <drifterpaki@gmail.com>',
      to: userEmail,
      subject: "Account Activation",
      text: `Your activation code is: ${activation_code}`,
      html: `<p>Your activation code is: <strong>${activation_code}</strong></p>`,
    });
  } catch (error) {
    console.error("Error sending registration email:", error);
    throw error;
  }
}
const createUser = async (req, res) => {
  try {
    const { username, email, age, password, phone } = req.body;

    // Validation
    if (!username || !email || !password || !age || !phone) {
      return res.status(201).json({
        message:
          "username, email, password, age, and phone are required fields.",
      });
    }

    // Check if user with the same name or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      let existingField;
      if (existingUser.username === username) {
        existingField = "username";
      } else {
        existingField = "email";
      }

      return res
        .status(201)
        .json({ message: `User with this ${existingField} already exists` });
    }

    // Validate name length
    if (username.length >= 30) {
      return res.status(201).json({
        message: `Username must be less than 30 characters. Current length is ${username.length}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(201).json({ message: "Invalid Email Format" });
    }

    // Validate age range
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 100) {
      return res
        .status(201)
        .json({ message: "Age must be between 18 and 100" });
    }

    // Validate phone number format
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(201).json({ message: "Invalid Phone Number Format" });
    }

    // Validate password
    if (!password || password.length < 8) {
      return res.status(201).json({
        message: "Password must be at least 8 characters long.",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(201).json({
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      });
    }

    // Generate a random 6-digit activation code
    const activationCode = Math.floor(100000 + Math.random() * 900000);

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user instance
    const newUser = new UserModel({
      username,
      email,
      ge: age.split("T")[0],
      password: hashedPassword,
      phone,
      activation_code: activationCode,
    });

    // Send registration email to the user
    await sendRegistrationEmail(email, activationCode);

    // Save the new user to the database
    await newUser.save();

    return res
      .status(200)
      .json({ message: "User Created Successfully", UserID: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const activateUser = async (req, res) => {
  try {
    const { userId, activationCode } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(201)
        .json({ message: `User not found ${activationCode}` });
    }

    if (user.isActivated) {
      return res.status(201).json({ message: "User Already Activated" });
    }

    // Check if the activation code matches
    if (user.activation_code === activationCode) {
      // Mark the user as activated (you can update other fields or perform additional actions)
      user.isActivated = true;

      // Save the updated user document
      await user.save();

      return res.status(200).json({ message: "User activated successfully" });
    } else {
      return res.status(201).json({ message: "Invalid activation code" });
    }
  } catch (error) {
    console.error("Error during activation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res
        .status(201)
        .json({ message: "username and password are required fields." });
    }

    // Check if user with the provided name exists
    const user = await UserModel.findOne({ username });

    // If the user doesn't exist, send an error response
    if (!user) {
      return res
        .status(201)
        .json({ message: "Username or password is incorrect" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, send an error response
    if (!isPasswordValid) {
      return res
        .status(201)
        .json({ message: "Username or password is incorrect" });
    }
    if (!user.isActivated) {
      // Send registration email to the user
      await sendRegistrationEmail(user.email, user.activation_code);
      return res.status(202).json({
        message:
          "Your Account is not activated. Kindly check your email for activation code",
        UserID: user._id,
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
      maxAge: 3600000, // 1 hour expiration
    });
    // Send the token and user ID in the response
    return res.json({ token, UserID: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(201).json({ message: "User not found" });
    }

    // Send the user object in the response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};
const getUserByUsername = async (req, res) => {
  try {
    const userName = req.params.username;

    // Find the user by ID
    const user = await UserModel.findOne({ username: userName });

    if (!user) {
      return res.status(201).json({ message: userName });
    }

    // Send the user object in the response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal server error" });
  }
};

const updateProfileByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const { image, newUsername } = req.body;

    // Fetch the user's profile
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Determine the new profile image
    let newProfileImage = user.profileImage;
    if (image && image.length > 0) {
      newProfileImage = image[0];
    }

    // Update the user's profile
    const updatedUser = await UserModel.findOneAndUpdate(
      { username: username },
      { username: newUsername, profileImage: newProfileImage },
      { new: true }
    );

    // Respond with success message
    res
      .status(200)
      .json({
        message: "Profile updated successfully",
        username: newUsername,
        profileImage: newProfileImage,
      });
  } catch (error) {
    console.error("Error editing profile", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  activateUser,
  login,
  getUserById,
  getUserByUsername,
  updateProfileByUsername,
};
