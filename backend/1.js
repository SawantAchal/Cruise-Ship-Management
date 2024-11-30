1. Project Planning & Setup
a. Requirements Gathering
Define the user stories and functionalities. These may include:
User (Customer) Side:
Book an appointment
View available services
User registration/login/logout
View booking history
Cancel/reschedule appointments
Admin Side:
Manage appointments (approve/cancel)
Add/edit/remove services
View all bookings
Manage employees (optional)
Additional Features:
Notifications (email/SMS) for booking confirmations, reminders, etc.
Payment gateway integration (if needed)
b. Database Design
User Model (for customers): Name, email, password, phone number, role (user/admin), etc.
Service Model: Name, description, price, duration.
Appointment Model: Date, time, status (confirmed, canceled, pending), user (who booked it), service (which service), etc.
Admin Model: You may use the same user model but with different permissions.
c. Technology Stack
Frontend: React, React Router, Axios (for API calls), Material UI (or Bootstrap for styling).
Backend: Node.js, Express, JWT for authentication, Bcrypt for password hashing, MongoDB.
Authentication: JWT for session management and role-based access control (for Admin vs User).



. Project Structure
/client (React Frontend)
  /src
    /components (UI components like Header, Footer, AppointmentForm, ServiceList, etc.)
    /pages (User Pages: Home, Booking, Dashboard, etc.)
    /services (API calls to Backend)
    /contexts (State management using React Context API)
    /assets (images, icons, etc.)

/server (Node.js/Express Backend)
  /models (Mongoose Models for MongoDB)
  /routes (Express Routes for handling API endpoints)
  /controllers (Logic for handling requests)
  /middleware (Auth and validation middleware)
  /utils (Utility functions like password hashing, token generation, etc.)
  /config (DB connection, environment variables)











Create your file structure:
/server
  /models
    user.js
    service.js
    appointment.js
  /controllers
    authController.js
    serviceController.js
    appointmentController.js
  /routes
    authRoutes.js
    serviceRoutes.js
    appointmentRoutes.js
  /config
    db.js
  server.js


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // user or admin
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
module.exports = User;



const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;




const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'confirmed', 'canceled'
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;




const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;










const express = require('express');
const Service = require('../models/service');
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;










const express = require('express');
const Appointment = require('../models/appointment');
const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  const { user, service, dateTime } = req.body;

  try {
    const newAppointment = new Appointment({ user, service, dateTime });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;









const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





























// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then((response) => setServices(response.data))
      .catch((error) => console.error('Error fetching services', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Our Beauty Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p>{service.description}</p>
            <p className="font-bold text-gray-700">{service.price} USD</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

















// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Logged in successfully:', response.data);
      // Store the JWT in localStorage or sessionStorage
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto mt-6">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" 
          className="w-full p-3 mb-4 border rounded" 
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;












// src/pages/Booking.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [service, setService] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const user = { /* Get logged-in user data from state */ };
      const appointmentData = { user: user.id, service, dateTime };
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      console.log('Appointment booked:', response.data);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center">Book an Appointment</h1>
      <form onSubmit={handleBooking} className="max-w-md mx-auto mt-6">
        <input 
          type="datetime-local" 
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-3 mb-4 border rounded" 
        />
        <select 
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Select Service</option>
          {/* Populate with services from the backend */}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;











we have to add payment intergration using stripe 


// routes/paymentRoutes.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key
const router = express.Router();

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in cents (e.g., 5000 = $50)

    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd", // Currency (USD in this case)
      payment_method_types: ["card"], // Allowed payment methods
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret, // Send client secret to frontend
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Payment intent creation failed" });
  }
});

module.exports = router;








// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/payments", paymentRoutes); // Add payment routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// src/stripe/StripeContext.js
import React, { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Load Stripe outside of a component’s render to avoid recreating the object on each render.
const stripePromise = loadStripe('your_stripe_publishable_key');

const StripeContext = createContext();

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // If you're using a loader, you can handle it here before rendering Elements
  const value = { isLoading, setIsLoading };

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};











// src/components/PaymentForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    try {
      // Call your backend to create the PaymentIntent
      const { data } = await axios.post("http://localhost:5000/api/payments/create-payment-intent", {
        amount,
      });

      const { clientSecret } = data;

      // Confirm the payment with the client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment failed", error);
      setErrorMessage("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold">Payment</h2>
      <div className="mt-4">
        <CardElement />
      </div>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-3 rounded"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;










// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm';

const PaymentPage = () => {
  const [amount, setAmount] = useState(5000); // e.g., $50 = 5000 cents

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center">Complete Payment</h1>
      <PaymentForm amount={amount} />
    </div>
  );
};

export default PaymentPage;
