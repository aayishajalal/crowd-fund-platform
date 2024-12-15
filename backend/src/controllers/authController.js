const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server configuration error. JWT_SECRET is missing.' });
    }

    // Sign the JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Return the token and a sanitized user object (without the password)
    const { password: _, ...userWithoutPassword } = user; // Destructure to remove password

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { register, login };
