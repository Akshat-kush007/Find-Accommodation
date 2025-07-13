# 🏠 Find Accommodation App

A full-stack MERN application that helps users **find PGs (Paying Guest accommodations)** based on location and city — powered by **AI search integration** via Google Gemini and n8n.

Users can sign up, search AI-curated PG listings, add new PGs, and manage their favorites — all in a responsive and modern UI.

---

## 🚀 Tech Stack

* **Frontend**: React + Vite + Tailwind CSS v4
* **Backend**: Node.js + Express.js
* **Database**: MongoDB (via Mongoose)
* **AI Integration**: Google Gemini + Google SerpApi via n8n AI Agent
* **State Management**: Redux Toolkit
* **Authentication**: Email OTP (custom system) using nodemailer
* **Toast Notifications**: react-toastify

---

## ✨ Features

* 🔐 User Signup/Login with Email OTP verification
* 🧠 AI-based search (via Gemini API)
* 🗐️ Filter by city and location
* ❤️ Favorite/unfavorite accommodations
* ➕ Add your own PGs
* 🧳 Reset password via email
* 📦 Protected routes
* 🧪 Fully testable API endpoints

---

## 📺 Live Demo

> Add your deployed link here if available
> e.g. `https://find-accommodation-gules.vercel.app/`

---

## 📸 Screenshots

<table>
  <tr>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/home.png" width="500"/>
    </td>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/signup1.png" width="500"/>
    </td>
  </tr>
  <tr>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/login.png" width="500"/>
    </td>
  </tr>
  <tr>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/dashboard.png" width="500"/>
    </td>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/accommodation.png" width="500"/>
    </td>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/favourites.png" width="500"/>
    </td>
  </tr>
  <tr>
    <td>
        <img src="https://github.com/Akshat-kush007/Find-Accommodation/blob/main/screenshots/ai.png" width="500"/>
    </td>
  </tr>
</table>

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Akshat-kush007/Find-Accommodation
cd find-accommodation
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Run Backend

```bash
cd ../backend
npm run dev
```

### 5. Run Frontend

```bash
cd ../frontend
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` files in both `backend` and `frontend`.

### 🔧 Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

### 🔧 Frontend `.env`

```env
VITE_REACT_APP_BASE_URL=http://localhost:5000/api
AGENT_API=AGENT_API (You need to create your own)
```

---

## 🔌 API Routes Overview

### 🔐 Auth Routes (`/auth`)

* `POST /sendotp` – Send OTP to email
* `POST /signup` – Register with OTP
* `POST /login` – Login with email + password
* `POST /updatePasswordToken` – Send reset token to email
* `POST /updatePassword` – Reset password using token

### 🏠 Accommodation Routes (`/accommodation`)

* `POST /addAccommodation` – Add a PG
* `POST /likeAccommodation` – Favorite a PG
* `POST /unlikeAccommodation` – Unfavorite a PG
* `GET /getAllAccommodation` – Public PGs
* `GET /getAllLikedAccommodation` – Favorites of logged-in user
* `GET /getAllAddedByUser` – PGs added by user
* `PUT /updateAccommodation`
* `DELETE /deleteAccommodation/:id`

---

## 🤖 AI Search Integration (n8n + Gemini)

The frontend sends a POST request to a custom webhook endpoint hosted in **n8n**.

### Query Payload Example:

```json
{
  "query": "Give me list of Pg in Delhi city ${location} Location response should be in json format a list contain json object, each object contain name, city, location, address, phone. Use Tool SerpAPI for websearch"
}
```

### AI Agent (n8n) Responds:

```json
[
  {
    "name": "Sunrise PG",
    "city": "Delhi",
    "location": "Kamala Nagar",
    "address": "123 Main Street",
    "phone": "+91 9876543210"
  }
]
```

You can self-host n8n or use their cloud service to build and trigger workflows with OpenAI/Gemini integration.

---

## 🗂️ Folder Structure

```
find-accommodation/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── redux/
├── n8n/
│   └── workflows/
└── README.md
```

---

## 👨‍💼 Author

**Your Name** – [@yourgithub](https://github.com/Akshat-kush007)
Feel free to reach out for collaboration or questions!

---

