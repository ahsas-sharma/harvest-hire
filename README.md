# Harvest Hire

![Harvest Hire](https://github.com/ahsas-sharma/harvest-hire/blob/main/harvest-hire-screenshot.jpeg?raw=true)

Harvest Hire is a full stack web application designed to simplify the rental process for farm equipment. It offers users a seamless experience to browse, rent, and manage equipment through an intuitive interface, while providing admins with tools to efficiently manage the inventory and rental requests.

## Purpose

The purpose of Harvest Hire is to streamline farm equipment rentals by connecting equipment owners with users who need to rent them. The application provides a robust solution to manage equipment availability, rental requests, and status updates, making it easy for both users and admins to interact.

## Features

### User Features:

- **Browse and Search Equipment**: Users can view all available equipment and search for specific items.
- **Rent Equipment**: Users can rent equipment and track the status of their rentals.
- **Profile Management**: Users can manage their account information, wishlist, and view rental history.
- **Responsive Design**: The UI is optimized for both desktop and mobile devices.

### Admin Features:

- **Manage Equipment**: Admins can add, update, and remove equipment from the system.
- **Approve or Reject Rental Requests**: Admins can view all rental requests and approve or reject them based on equipment availability.
- **Monitor Rentals**: Admins can track the status of equipment rentals (rented, returned, etc.) and update the status as needed.

## Technologies and Dependencies

### Client-Side:

- **React**: Front-end framework for building a dynamic UI.
- **TailwindCSS**: For styling and creating responsive, modern designs.
- **Axios**: For handling API requests.
- **DaisyUI**: For enhanced UI components.
- **React Router**: For navigation within the application.
- **React Simple Image Slider** and **React Slick**: For displaying equipment images in a slider format.
- **Heroicons**: For including icons in the UI.

### Server-Side:

- **Node.js** and **Express.js**: For creating the back-end API.
- **Mongoose**: For interacting with MongoDB, the database for storing equipment and user data.
- **Passport.js** and **JWT**: For authentication and securing user sessions.
- **Express Validator**: For validating user input.
- **Bcrypt**: For password hashing.
- **Dotenv**: For managing environment variables.
- **Nodemon**: For hot-reloading during development.

## Installation and Setup

### Prerequisites:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or provide a connection string)

### Clone the Repository:

```bash
git clone https://github.com/ahsas-sharma/harvest-hire.git
cd harvest-hire
```

### Client Setup:

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Server Setup:

1. Navigate to the `server` folder:
   ```bash
   cd ../server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the `server` folder. Add the following variables:
   ```
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Build for Production:

To build the application for production:

1. Navigate to the `client` folder and build the client:
   ```bash
   npm run build
   ```
2. Serve the built files in production mode using a static server or deploy the application to a platform like Vercel or Netlify.

## Contribution

Feel free to fork the repository and make contributions. Pull requests are always welcome.

## License

This project is licensed under the MIT License.
