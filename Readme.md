# 🛍️ Item Showcase Web App

A full-stack web application built with React + TypeScript (Vite) and Express.js for managing and viewing various items like shirts, pants, shoes, and sports gear.

## 📌 Features

### ✅ Core Features

- **Add Item Page**:

  - Form to add:
    - Item Name
    - Item Type (e.g., Shirt, Pant, Shoes, etc.)
    - Item Description
    - Cover Image (1 image)
    - Additional Images (up to 5)
  - Success toast message on item creation.
  - Images uploaded using `multer`.

- **View Items Page**:
  - Lists all items with:
    - Name
    - Cover image
  - Clicking on an item opens a **modal**:
    - Carousel of all uploaded images
    - Full description, name, type
    - **Enquire** button

### 💡 Bonus Features

- Backend integrated with MongoDB
- Uploaded files are stored locally or can be configured for cloud (e.g., AWS S3)
- On clicking "Enquire", a static email gets a notification using nodemailer

---

## 🛠️ Tech Stack

### Frontend:

- React.js (TypeScript)
- Tailwind CSS
- Redux Toolkit for state management
- React Router DOM
- Axios
- React Toastify
- React Modal + Carousel

### Backend:

- Node.js + Express.js
- Multer for handling file uploads
- Nodemailer for sending emails
- MongoDB with Mongoose

---

## 📁 Project Structure

```
📦project-root/
 ┣ 📂backend/
 ┃ ┣ 📂controller/
 ┃ ┃ ┗ 📄item.js
 ┃ ┣ 📂middlewares/
 ┃ ┃ ┗ 📄multer.js
 ┃ ┣ 📂models/
 ┃ ┃ ┗ 📄Item.js
 ┃ ┣ 📂routes/
 ┃ ┃ ┗ 📄itemRoutes.js
 ┃ ┣ 📄index.js
 ┃ ┗ 📄.env
 ┣ 📂frontend/
 ┃ ┣ 📂src/
 ┃ ┃ ┣ 📂pages/
 ┃ ┃ ┃ ┣ 📄AddItem.tsx
 ┃ ┃ ┃ ┗ 📄ViewItems.tsx
 ┃ ┃ ┣ 📂components/
 ┃ ┃ ┃ ┣ 📄Header.tsx
 ┃ ┃ ┃ ┣ 📄ItemCard.tsx
 ┃ ┃ ┃ ┗ 📄ItemModal.tsx
 ┃ ┃ ┣ 📂redux/
 ┃ ┃ ┃ ┗ 📄itemSlice.ts
 ┃ ┃ ┣ 📄main.tsx
 ┃ ┃ ┗ 📄App.tsx
 ┃ ┣ 📄tailwind.config.js
 ┃ ┗ 📄vite.config.ts
```

---

## 🔌 API Endpoints

### `POST /api/items/create`

- Add a new item
- Body (FormData): `itemName`, `itemType`, `itemDescription`, `coverImage`, `additionalImages[]`

### `GET /api/items/`

- Fetch all items

### `POST /api/items/enquire`

- Send an enquiry email
- Body: `{ itemId, email, message }`

---

## 🧪 Environment Variables (`backend/.env`)

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/item-showcase
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

> ⚠️ For Gmail users, you may need to use an [App Password](https://support.google.com/accounts/answer/185833).

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ensure CORS is properly configured on the backend and that Vite knows your backend URL via `vite.config.ts`.

---

## 🧼 To Do (Optional Enhancements)

- Deploy backend on Render / Railway / Heroku
- Host frontend on Vercel / Netlify
- Store images on Cloudinary or S3
- Use real user emails for Enquiry

---

## 📸 Screenshots

---
