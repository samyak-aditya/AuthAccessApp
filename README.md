

# AuthAccess App

### Security Measures Implemented:

- Implemented JSON Web Tokens (JWT) for secure authentication and authorization.
- Utilized the .env file to store sensitive environment variables securely.
- Employed bcrypt to hash passwords, enhancing security by safeguarding user credentials.
  
## Installation Guide
*note* - Including the .env file in the repository is not considered standard practice, but it was included for the ease of running the code for your team.
### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- MongoDB (or any other preferred database)

### Getting Started
1. **Clone the repository** to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd <project-directory>
   ```

### Backend Setup
1. **Install backend dependencies**:
   ```bash
   npm install
   ```
2. **Create a `.env` file** in the root directory and add the following environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=<mongodb-uri>
   JWT_SECRET=<jwt-secret-key>
   ```
   Replace `<mongodb-uri>` with your MongoDB connection string and `<jwt-secret-key>` with a secret key for JWT token encryption.
3. **Start the backend server**:
   ```bash
   npm start
   ```

### Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

### Running the Application
1. **Start the frontend server**:
   ```bash
   npm start
   ```
2. **Open your web browser** and navigate to `http://localhost:3000` to access the application.


### Additional Notes
- Ensure that MongoDB is running before starting the backend server.
- You can customize the frontend and backend configurations according to your project requirements in their respective directories.
```

