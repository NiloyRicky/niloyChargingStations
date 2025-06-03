# niloyChargingStations

# ⚡ EV Charging Stations Dashboard

A full-stack web application for managing electric vehicle charging stations. Users can **register**, **log in**, and **add**, **edit**, **delete**, or **filter** charging stations. The UI also includes a **map view** to visualize station locations.

---

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- 📍 Add, Edit, Delete Charging Stations
- 📊 Filter stations by power, status, and connector type
- 🗺️ Integrated Map View using Leaflet.js
- 📦 Full CRUD functionality with real-time UI updates
- 🎨 Clean and responsive UI

---

## 🏗️ Tech Stack

### Frontend
- React.js
- CSS / Tailwind (optional)
- Leaflet.js (for map)

### Backend
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Cookie-based authentication (using JWT)

---

## 📂 Project Structure

chargingStations/
├── frontend/station # React.js (UI)
├── backend/ # Node.js, Express.js, MongoDB
└── README.md

### Set up Instructions
### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NiloyRicky/niloyChargingStations.git
cd niloyChargingStations

2️⃣ Setup Backend
cd backend
npm install
Create a .env file inside backend/ with the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start the backend:
npm start
Runs at: http://localhost:5000


3️⃣ Setup Frontend
cd ../frontend/station
npm install

Start the React app:
npm start
Runs at: http://localhost:3000

🌐 Deployment Guide

Frontend
Deploy frontend/ to Netlify or Vercel:
npm run build
Upload the /build folder to Netlify.

Backend
Deploy backend/ to Render, Railway, or Cyclic.
Make sure to:

Set up the same .env variables on the hosting platform.

Enable CORS for the deployed frontend domain.

Set credentials: "include" in all fetch calls from frontend.

🔗 API Endpoints
##Auth Routes
POST /register – Register new user

POST /login – Login with credentials

GET /logout – Logout and clear cookies

##Station Routes
GET /readStation – Get all stations (auth required)

POST /createStation – Add a station (auth required)

PUT /updateStation/:id – Update station (auth required)

DELETE /deleteStation/:id – Delete station (auth required)


📦 Sample JSON (Station)
{
  "name": "Niloy Station",
  "location": {
    "latitude": "22.57",
    "longitude": "88.36"
  },
  "status": "Active",
  "power": "60kW",
  "connector": "Type2"
}


👨‍💻 Author
Made with ❤️ by Niloy Mondal
GitHub
