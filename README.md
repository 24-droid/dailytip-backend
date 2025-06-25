# 🛠️ DailyTip – Backend

This is the backend of the **DailyTip** full-stack web application. It handles user authentication, scheduled email delivery, and Dev.to integration. Built using Node.js, Express, and MongoDB.

---

## 🌟 Features

* JWT-based Authentication (Access + Refresh tokens)
* Password hashing with bcrypt
* HttpOnly cookie handling for refresh token
* Scheduled email delivery using Dev.to API
* Nodemailer setup for transactional emails
* RESTful API endpoints for user registration, login, and tip scheduling

---

## 🧰 Tech Stack

* Node.js
* Express
* MongoDB (Mongoose)
* JWT
* bcrypt
* Nodemailer
* node-cron
* Render(for deployment)

---

## 📁 Folder Structure

```
src/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── models/
├── config/
├── server.js
```

---

## ⚙️ Getting Started (Local Setup)

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/dailytips-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   PORT=5000
   MONGO_URI=your_mongo_db_uri
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   SMTP_EMAIL=your_email
   SMTP_PASS=your_email_password
   ```

4. Run the server:

   ```bash
   npm start
   ```

---

## 🔁 Related Repositories

* **Frontend Repo:** [dailytips-frontend](https://github.com/24-droid/dailytips-frontend)

---

## 📦 API Endpoints (Examples)

* `POST /api/signup`
* `POST /api/login`
* `GET /api/tip/send` (cron job route)

---

## 🙌 Author

Made with ❤️ by **Om Singh**

* [GitHub](https://github.com/24-droid)
* [LinkedIn](https://www.linkedin.com/in/om-singh-it)
