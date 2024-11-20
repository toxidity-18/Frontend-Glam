# Beauty Shop E-Commerce Project

## Overview
In today's fast-paced world, both men and women are increasingly interested in enhancing their appearance through beauty products. The Beauty Shop project addresses this demand by providing a convenient e-commerce platform where customers can purchase a wide variety of beauty products and have them delivered directly to their doorsteps.

## Solution
The solution is to develop an e-commerce website that offers a diverse range of beauty products, ensuring a seamless shopping experience for users.

## Features

### MVP Features
- **User Authentication**
  - Login functionality for returning customers.
  - Account creation for new users.

- **Product Listings**
  - Display beauty items categorized for easy navigation.

- **Shopping Cart**
  - A section where users can view all beauty products added to their cart.

- **Checkout Process**
  - A streamlined checkout section for order purchases.
  - Simulated payment process that generates address, billing information, and invoices for every order submitted.

### Admin Features
- **Product Management**
  - Perform CRUD (Create, Read, Update, Delete) operations on beauty products.

- **User Management**
  - Add users with specific roles to manage beauty products and orders.

- **Analytics Dashboard**
  - View analytics on different beauty products available on the platform.
  - Monitor analytics related to orders made by customers.

-  **Supplier Management**
  -  Add suppliers for the products

## Technical Specifications

- **Backend Framework**: Flask
- **Database**: PostgreSQL
- **Frontend Framework**: ReactJS with Context API for state management

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Python (for Flask)
- PostgreSQL
- Node.js (for ReactJS)
- Yarn or npm (for package management)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/toxidity-18/Frontend-Glam.git
   npm install
   npm run dev https://localhost/3000
  ```
2,Setting up the backend 
  ```
  git clone https://github.com/toxidity-18/GLAM-BACKEND.git
  pip install -r requirements.txt
  flask run https://llocalhost/5000
  ```
  ```

## Project Flow for Beauty Shop E-Commerce

## 1. User Interaction Flow

### 1.1 User Registration and Login
- **User visits the website**: The user navigates to the Beauty Shop homepage.
- **Registration/Login options**: 
  - If the user is new, they can click on "Register" to register.
  - If they already have an account, they can click on "Login."
- **Form Submission**:
  - For registration: User fills in their details (name, email, password) and submits the form.
  - For login: User enters their email and password and submits the form.

### 1.2 Product Browsing
- **Product Categories**: After logging in, users are directed to the product listing page where they can view beauty products categorized (e.g., skincare, makeup, haircare).
- **Filtering and Searching**: Users can filter products based on categories .

### 1.3 Adding Products to Cart
- Select the product and view it .
- **Add to Cart**: user clicks "Add to Cart." The product is added to their shopping cart.

### 1.4 Viewing Cart and Checkout
- **Cart Overview**: Users can access their cart to review selected items.
- **Proceed to Checkout**: Users click on "Checkout" to start the purchasing process.
- **Checkout Form**:
  - Users enter shipping address and payment information (simulated for this project).
  - Users review order details before finalizing.

### 1.5 Order Confirmation
- **Order Submission**: After confirming the order, users receive an order confirmation message.
- **Invoice Generation**: An invoice is generated internally with billing information.

## 2. Admin Interaction Flow

### 2.1 Admin Login
- Admins log in using their credentials to access the admin dashboard.

### 2.2 Managing Products
- **CRUD Operations**:
  - Admins can create new beauty product listings.
  - Admins can read/view existing products.
  - Admins can update product details (e.g., price, description).
  - Admins can delete products that are no longer available.

### 2.3 Managing Users
- **User Management**: Admins can add new users or manage existing ones based on roles (e.g., regular user, admin).

### 2.4 Supplier Dashboard
- **View Suppliers**:
  - Admin can view add edit and delete suppliers.
  

## 3. Technical Flow

### 3.1 Frontend Interaction
- The frontend is built using ReactJS with Context API for state management.
- User actions trigger API calls to the backend for data retrieval or updates (e.g., fetching products, submitting orders).

### 3.2 Backend Processing
- The backend is developed using Flask.
- API endpoints handle requests from the frontend:
  - `/api/register` for user registration.
  - `/api/login` for user authentication.
  - `/api/products` for retrieving product listings.
  - `/api/cart` for managing cart items.
  - `/api/orders` for processing orders.

### 3.3 Database Operations
- PostgreSQL is used as the database to store user information, product details, and order history.
- The backend interacts with the database using ORM (Object Relational Mapping) to perform CRUD operations efficiently.

## Summary of Flow
The Beauty Shop project flow encompasses user interactions from registration to checkout, admin functionalities for managing products and users, and technical processes involving frontend-backend communication and database management. This structured flow ensures a seamless shopping experience while providing robust administrative capabilities.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
