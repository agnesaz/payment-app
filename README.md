Payment App
Description
This is a simple payment application built using Node.js and Express.js. The application allows users to register, select payment providers, and make payments. It includes both a frontend for user interaction and a backend for processing transactions.

Features
    User registration
    Fetching and displaying payment providers
    Making payments
    Handling success and failure modals
    Token-based authentication

Table of Contents
    Technologies Used
    Setup and Installation
    Frontend
    Backend
    API Endpoints
    Testing
    Contributing
    License

Technologies Used
    Frontend: HTML, CSS, JavaScript
    Backend: Node.js, Express.js
    Database: MongoDB (via Mongoose)
    Authentication: JWT
    Logging: Winston

Setup and Installation
Prerequisites
    Node.js (v14 or higher)
    MongoDB (local or remote instance)  

Installation
Clone the Repository
    git clone https://github.com/your-username/payment-app.git
    cd payment-app

Install Dependencies
    npm install

Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
    MONGO_URI=mongodb://localhost:27017/payment-app
    JWT_SECRET=your_jwt_secret
Adjust MONGO_URI and JWT_SECRET as needed.

Start the Server
    npm start
The server will start on port 3000 by default. You can change the port if needed.

Frontend
    Registration Page
    Path: public/registration.html
    Functionality: Allows users to register with their name, last name, and email. Upon successful registration, users are redirected to the payment page.
   
    Payment Page
    Path: public/payment-form.html
    Functionality: Allows users to select a payment provider and enter an amount. Displays modals for success, failure, and input errors.

Backend
Folder Structure
    models/: Contains Mongoose models.
    PaymentProvider.js: Schema for payment providers.

    routes/: Contains route handlers.
    paymentProviders.js: Routes for managing payment providers.
    transactions.js: Routes for creating transactions.

    services/: Contains business logic.
    PaymentProviderService.js: Service for managing payment providers.

    utils/: Utility functions.
    generateProviderToken.js: Generates tokens for payment providers.
    logger.js: Configures the logger using Winston.


API Endpoints

POST /api/users/register
    Registers a new user.
    Request Body: { "name": "John", "lastname": "Doe", "email": "john@example.com" }

GET /api/providers/payment-providers
    Fetches all payment providers.
    Authorization: Bearer token required.

POST /api/transactions/create-transaction
    Creates a new transaction.
    Request Body: { "providerId": "provider_id", "amount": 100.00 }
    Authorization: Bearer token required.


Testing
Run unit tests using:
npm test
Ensure you have a test database configured in your .env.test file.

Contributing
    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Create a new Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

