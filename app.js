const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const companyRoutes = require('./routes/companyRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateUser, authorizeAdmin } = require('./middlewares/authMiddleware');
const User = require('./models/userModel');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', authenticateUser, authorizeAdmin, upload.single('Company_Logo'), companyRoutes);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
