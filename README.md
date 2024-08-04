Payment App

This is a simple payment application built using Node.js and Express.js. It allows users to register, select payment providers, and make payments. Although the primary focus is on backend functionalities—such as transaction processing and business logic—several frontend HTML pages have been included to enable basic user interactions

Features

    User registration
    Fetching and displaying payment providers
    Making payments
    Handling success and failure modals
    Token-based authentication


Table of Contents

    Technologies Used
    Setup and Installation
    Backend
    API Endpoints
    Frontend
    Testing
    Contributing
    License


Technologies Used

    Backend: Node.js, Express.js
    Database: MongoDB (via Mongoose)
    Frontend: HTML, CSS, JavaScript
    Authentication: JWT
    Logging: Winston


Setup and Installation
Prerequisites

    Node.js (v14 or higher)
    MongoDB (local or remote instance)  

Installation
Clone the Repository
       
    git clone https://github.com/agnesaz/payment-app.git
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


Backend
Folder Structure

    config/: Contains configuration files, including settings for the database connection and other global settings.
    controllers/: Manages the logic for handling HTTP requests and responses.
    db/: Contains files related to database management.
    logs/: Contains log files for application debugging and monitoring.
    middleware/: Includes middleware functions for authentication, error handling, and other request processing tasks.
    migrations/: Contains database migration files for schema changes.
    models/: Defines the database schema and models using Mongoose.
    public/: Contains static files that are served publicly.
    routes/: Sets up the API routes and links them to the appropriate controllers.
    services/: Contains the business logic for handling operations related to transactions and payment providers.
    tests/: Holds unit and integration tests for different components of the application.
    utils/: Provides utility functions that support various operations across the application.


API Endpoints

    POST /api/users/register
        Registers a new user.
        Request Body: { "name": "John", "lastname": "Doe", "email": "john@example.com" }

    POST /api/users/additional-info
        Updates additional information for an authenticated user.
        Authorization: Bearer token required.
        Request Body: { "country": "CountryName", "phone": "PhoneNumber", "postalCode": "PostalCode"}

    GET /api/providers/payment-providers
        Fetches all payment providers.
        Authorization: Bearer token required.

    POST /api/transactions/create-transaction
        Creates a new transaction.
        Request Body: { "providerId": "provider_id", "amount": 100.00 }
        Authorization: Bearer token required.

    POST /api/providers/create-provider
        Creates a new payment provider. Requires admin privileges.
        Authorization: Bearer token required.
        Request Body: {"name": "ProviderName"}


Frontend
   
    Registration Page
    Path: public/registration.html
    Functionality: Allows users to register with their name, last name, and email. Upon successful registration, users are redirected to the additional information page.

    Additional Page
    Path: public/additional-info.html
    Functionality: Allows users to update the informations with their country, phone  number, and zip number. When filled these fields, users are redirected to the payment page.
   
    Payment Page
    Path: public/payment-form.html
    Functionality: Allows users to select a payment provider and enter an amount. Displays modals for success, failure, and input errors.


Testing
Run unit tests using:
    
    npm test

Contributing

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Create a new Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

