# ECOMM Angular Project

This is an end-to-end (E2E) e-commerce application built with **Angular** and **JSON Server** for the backend. The project utilizes **localStorage** and **JSON Server** for data storage and management. It is designed to help users understand the process of building a full-fledged e-commerce platform, integrating frontend and backend functionality.

## Technologies Used
- **Angular**: Frontend framework
- **Node.js**: JavaScript runtime for running Angular and managing dependencies
- **JSON Server**: Mock backend to handle CRUD operations for the database
- **localStorage**: For data persistence on the client-side

## Prerequisites
Before setting up the project, you need to have the following software installed:

### 1. Install **Node.js**
   - Download and install Node.js from the official website: [Node.js](https://nodejs.org/).
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

### 2. Install **Angular CLI**
   - After installing Node.js, install Angular CLI globally on your system:
     ```bash
     npm install -g @angular/cli
     ```

### 3. Install **JSON Server**
   - JSON Server is used for handling backend operations in this project:
     ```bash
     npm install -g json-server
     ```

### 4. Clone the Repository
   - Clone the project to your local machine:
     ```bash
     git clone https://github.com/PranavLord/ECOMM-Angular-Project.git
     cd ECOMM-Angular-Project
     ```

## Setting Up the Project

### 1. Install Project Dependencies
   - Run the following command to install the necessary dependencies for the Angular project:
     ```bash
     npm install
     ```

### 2. Set Up the Backend (JSON Server)
   - Create a mock database using JSON Server.
   - Inside the project directory, create a `db.json` file (or you can use the pre-existing one) to simulate the backend data.
     - Example `db.json` file:
       ```json
       {
         "products": [],
         "users": [],
         "orders": []
       }
       ```
   - Start the JSON Server to handle CRUD operations:
     ```bash
     json-server --watch db.json --port 3000
     ```

### 3. Start the Angular Project
   - Once the backend is set up, you can start the Angular frontend:
     ```bash
     ng serve
     ```
   - This will start the application on `http://localhost:4200/`.

### 4. Using LocalStorage
   - The application uses **localStorage** for storing user data on the client-side. Make sure your browser allows cookies and localStorage for the application to function properly.

## Features of the Project
- **Product Listings**: Display products with details like price, description, and image.
- **Cart Functionality**: Add products to the cart and manage items.
- **User Authentication**: Allow users to log in and manage their profiles.
- **Order Placement**: Users can place orders for products in the cart.
- **Mock Backend**: Uses JSON Server for data handling and CRUD operations.

## How to Run the Project
1. **Backend Setup**: 
   - Run `json-server` to start the backend:
     ```bash
     json-server --watch db.json --port 3000
     ```
   
2. **Frontend Setup**: 
   - Run the Angular app:
     ```bash
     ng serve
     ```
   - Open your browser and navigate to `http://localhost:4200/` to see the app in action.

## Contribution
- Fork the repository.
- Create a new branch.
- Make your changes and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Enjoy the E-commerce Project!**
