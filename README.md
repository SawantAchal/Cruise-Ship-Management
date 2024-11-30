## Cruise Ship Management System ##
A comprehensive system for managing various cruise ship services, including food orders, fitness bookings, movie bookings, and more. The platform offers a user dashboard for customers and an admin dashboard for managing services.

**deploy Link frontend** - https://cruise-ship-management-frontend.onrender.com/
**deploy Link admin** - https://cruise-ship-management-admin.onrender.com/
# Features #

**User Features**

  Menu Ordering: Users can order food and track order status.
  
  Fitness Bookings: Users can book fitness sessions and select equipment.

  Movie Bookings: Users can book movie tickets, choose seats, and track their bookings.
  
  Cart Management: Easily add, remove, or modify cart items.
  
  Secure Payments: Integrated with Stripe for seamless payment processing.

**Admin Features**

  Manage Orders: View and update order statuses for all users.
  
  Manage Fitness Slots: Add, update, or delete fitness slots.
  
  Manage Equipment: Manage available equipment for fitness bookings.
  
  View All Bookings: Track bookings for movies, fitness, and more.


# Tech Stack #

**Frontend**

  React.js
  
  Tailwind CSS
  
  Axios for API calls
  
**Backend**
  Node.js
  
  Express.js
  
  MongoDB (Mongoose for database modeling)
  
**Payment Integration**

Stripe API

# Setup Instructions #

1. Clone the Repository
   
   git clone https://github.com/your-repo/cruise-ship-management.git
   
  cd cruise-ship-management
  
2. Install Dependencies

   cd frontend
   
  npm install

  3. Set Up Environment Variables
MONGO_URI=your_mongodb_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

JWT_SECRET=your_jwt_secret

PORT=4000
