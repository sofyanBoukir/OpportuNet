# OpportuNet
![Screenshot from 2025-04-06 13-49-18](https://github.com/user-attachments/assets/c1704b26-136c-49f8-af56-3939a49848b1)

This repository contains the source code for a LinkedIn-like professional networking platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application enables users to create professional profiles, connect with others, share posts, and explore job opportunities.

## TECH STACK 
### FRONT-END
- React.js
- Tailwind.css
- Socket.io-client

### BACKEND & DATABASE
- Express.js on Node.js run time env
- Socket.io
- Mongodb

## Installation
1. Clone the repository
   ``` git clone https://github.com/sofyanBoukir/OpportuNet.git```

2. Configure backend
   ```
   cd server
   npm install
   ```
3. configure the .env server file
   ```
   JWT_SECRET=SECRET0001EXAMPLE
    PORT=5000
    MONGO_URL=mongodb://127.0.0.1/oppNetDb
    SERVER_URL=http://localhost:5000
    FROM_MAIL=your.mail@gmail.com
    SMTP_MAIL=your.smtp.mail@gmail.com
    SMTP_PASS=smtp.mail.password
    RESET_LINK_URL=http://localhost:5173/user/new_password
    FRONTEND_URL=http://localhost:5173
   ```

4. Configure the frontend
  ```
  npm install
  ```
5. run servers
   ```
   cd frontend
   npm run dev
   cd ../server
   npm start
   ```
