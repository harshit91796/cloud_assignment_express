const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { registerSchema, loginSchema } = require('../validator/user.joi');


dotenv.config();

const registerUser = async (req, res) => {
    try {
        // Validate input using Joi
        const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.details.map(detail => detail.message) 
            });
        }

        const { name, email, password, age } = value;

        const user = new User({ name, email, password, age });
        await user.save();

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables.');
            return res.status(500).json({ error: 'Internal server error' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'User registration failed', details: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        // Validate input using Joi
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.details.map(detail => detail.message) 
            });
        }

        const { email, password } = value;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ data: user, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'User login failed' });
    }
};

const profile = async (req, res) => {
    res.status(200).json({ data: req.user });
};

const jokes = async (req, res) => {
    // return "helloc"
    console.log('hello')
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
       
        if (!response.ok) {
            return res.status(400).json({ error: 'Joke not found' });
        }

        const data = await response.json();

        if (!data || !data.value) {
            return res.status(400).json({ error: 'Joke not found' });
        }

        const { value } = data;
        res.status(200).json({ data: value });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { 
    registerUser,
    loginUser,
    profile,
    jokes
};
