from flask import Flask, request, jsonify
from flask_cors import CORS
from db_config import get_connection

app = Flask(__name__)
CORS(app)

# ---------------- HOME ROUTE ----------------
@app.get("/")
def home():
    return jsonify({"message": "Backend is running!", "status": "ok"})

# ---------------- GET STUDENTS --------------
@app.get("/students")
def get_students():
    db = get_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students ORDER BY roll")
    rows = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(rows)

# ---------------- ADD STUDENT ---------------
@app.post("/students")
def add_student():
    data = request.json
    db = get_connection()
    cursor = db.cursor()
    sql = "INSERT INTO students (roll,name,branch,course,attendance) VALUES (%s,%s,%s,%s,%s)"
    cursor.execute(sql, (data["roll"], data["name"], data["branch"], data["course"], data["attendance"]))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"status": "added"})

# ---------------- UPDATE STUDENT ------------
@app.put("/students/<roll>")
def update_student(roll):
    data = request.json
    db = get_connection()
    cursor = db.cursor()
    sql = "UPDATE students SET name=%s,branch=%s,course=%s,attendance=%s WHERE roll=%s"
    cursor.execute(sql, (data["name"], data["branch"], data["course"], data["attendance"], roll))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"status": "updated"})

# ---------------- DELETE STUDENT ------------
@app.delete("/students/<roll>")
def delete_student(roll):
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM students WHERE roll=%s", (roll,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"status": "deleted"})


if __name__ == "__main__":
    app.run(debug=True)
