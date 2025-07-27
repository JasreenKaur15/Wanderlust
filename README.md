# 🌍 Wanderlust

Wanderlust is a travel-focused web application that allows users to explore, review, and manage beautiful travel destinations. Built with Node.js, Express, MongoDB, and EJS templating, it follows the MVC architecture and is designed for both learning and practical implementation of full-stack web development.

---

## 🚀 Live Demo

🌐 **Deployed Link**: [https://wanderlust-inek.onrender.com](https://wanderlust-inek.onrender.com)

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Passport.js
- **Templating Engine**: EJS
- **Deployment**: [Render](https://render.com/)

---

## 📁 Project Structure

```
Wanderlust/
│
├── controllers/        # Logic handlers for routes
├── init/               # MongoDB initialization and seeding
├── models/             # Mongoose schemas
├── public/             # Static files (CSS, JS, images)
├── routes/             # Express route definitions
├── utils/              # Helper functions
├── views/              # EJS views/templates
│
├── app.js              # Main Express app
├── schema.js           # Data validation (Joi or Mongoose)
├── package.json        # Project metadata and dependencies
```

---

## 🧩 Features

- 🗺️ Explore curated travel destinations
- ✍️ Add and manage reviews
- 🔐 User registration and login with secure authentication
- ⚙️ Full CRUD operations for destinations and reviews
- 📄 Clean and responsive UI with Bootstrap

---

## 📦 Installation

```bash
git clone https://github.com/JasreenKaur15/Wanderlust.git
cd Wanderlust
npm install
```

Create a `.env` file for environment variables like Mongo URI and session secret.

Start the server:

```bash
npm start
```

Then open `http://localhost:3000` in your browser.

---

## 🙋‍♀️ Author

Made with ❤️ by Jasreen Kaur
[GitHub Profile](https://github.com/JasreenKaur15)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
