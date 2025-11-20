# 🎓 Smart Attendance Dashboard — Full Stack (Flask + MySQL + HTML/JS)

A fully responsive **Smart Attendance Management Dashboard** built using:

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Flask (Python REST API)  
- **Database:** MySQL (Local or Cloud e.g., Aiven/PlanetScale/DB4Free)  
- **Features:** CRUD, Excel Export, Search, Notice Board, Dark Mode, Responsive UI  

This project allows you to maintain and monitor student attendance.  
You can add/update/delete students **from both the website UI and the MySQL terminal**.  
The dashboard automatically fetches real-time data from MySQL.

---

## 🚀 Features

### ✅ **1. Real-Time MySQL Data Fetching**
- The dashboard loads all student data directly from MySQL.
- Any data added directly in MySQL terminal appears automatically on the site.

### ✅ **2. CRUD Operations**
- Add new student  
- Edit student details  
- Delete student  
- Fully synced with MySQL backend

### ✅ **3. Auto Refresh**
- Dashboard refreshes automatically every 5 seconds.
- Always shows latest MySQL data.

### ✅ **4. Responsive UI**
- Works on mobile, tablet, laptop.
- Clean modern UI with dark/light theme switch.

### ✅ **5. Excel Export**
- Export all attendance data into `.xlsx` using SheetJS.

### ✅ **6. Notice Board**
- Post real-time notices displayed instantly on UI.

---

## 📁 Project Structure

```
smart-attendance-system/
│
├── backend/
│   ├── app.py               → Flask Backend API
│   ├── db_config.py         → MySQL connection config
│   └── ca.pem               → SSL certificate (for cloud MySQL)
│
├── frontend/
│   ├── index.html           → Main UI
│   ├── style.css            → Dashboard styling
│   └── script.js            → All JS logic + API calls
│
└── database/
    └── create_tables.sql    → SQL file to create MySQL tables
```

---

## 🗄️ Database Setup

Run this SQL to create the database and table:

```sql
CREATE DATABASE IF NOT EXISTS student_system;

USE student_system;

CREATE TABLE students (
    roll VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    branch VARCHAR(50),
    course VARCHAR(50),
    attendance INT(3)
);
```

---

## ⚙️ Backend Setup (Flask)

### 1️⃣ Install Python dependencies

```
pip install flask flask-cors mysql-connector-python
```

If using the provided `requirements.txt`:

```
pip install -r requirements.txt
```

### 2️⃣ Configure MySQL

Edit `backend/db_config.py`:

```python
def get_connection():
    return mysql.connector.connect(
        host="YOUR_HOST",
        user="YOUR_USER",
        password="YOUR_PASSWORD",
        database="student_system",
        ssl_ca="ca.pem"          # only when using cloud MySQL like Aiven
    )
```

### 3️⃣ Run Backend API

```
cd backend
python app.py
```

Server runs at:

```
http://127.0.0.1:5000/
```

API endpoint:

```
http://127.0.0.1:5000/students
```

---

## 🖥️ Frontend Setup

Simply open:

```
frontend/index.html
```

Or use VS Code Live Server:

```
http://127.0.0.1:5500/frontend/index.html
```

---

## 🔄 How Dashboard Works (Flow)

```
Frontend (HTML/CSS/JS)
     ↓ fetch API
Backend (Flask)
     ↓ query
MySQL Database
```

- Add Student → POST → MySQL  
- Edit Student → PUT → MySQL  
- Delete Student → DELETE → MySQL  
- Auto Refresh → GET → MySQL every 5 seconds  
- Manual SQL INSERT also reflected on dashboard  

---

## 🛠️ Useful Commands

### ▶ Run backend:
```
python backend/app.py
```

### ▶ Install requirements:
```
pip install -r requirements.txt
```

### ▶ Export attendance to Excel:
Click **Download Excel** in UI.

### ▶ MySQL login (local):
```
mysql -u root -p
```

### ▶ Insert new student manually:
```
INSERT INTO students VALUES ("23AI042", "Ravi", "AI&DS", "DBMS", 100);
```

---

## 🌐 Deployment Options (Free)

You can deploy backend + MySQL using:

- PythonAnywhere (Free)
- DB4Free / Aiven / FreeMySQLHosting (Free)
- Netlify / Vercel for frontend (Free)

---

## ❤️ Credits

This project is made for educational purposes.  
Created by **Ravi & Sumit (2025)**.

---

## 📬 Need Help?

If you need help with:

- Deployment  
- Adding Login System  
- Adding Admin Panel  
- Adding Attendance Graphs  
- QR Code / Face Recognition Attendance  

Feel free to reach out or open an issue.

