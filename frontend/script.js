// API endpoint
const API = "http://127.0.0.1:5000/students";

let students = [];

// Load students from MySQL
async function loadStudents() {
    let res = await fetch(API);
    students = await res.json();
    renderTable();
}
loadStudents();

// Also auto-refresh every 5 seconds (so MySQL changes appear)
setInterval(loadStudents, 5000);


// Render Table
function renderTable(list = students) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No Data Available</td></tr>`;
        return;
    }

    list.forEach(s => {
        let color = s.attendance >= 75 ? "green" :
                    s.attendance >= 50 ? "yellow" : "red";

        tbody.innerHTML += `
        <tr>
            <td class="roll-clickable" onclick="openModal('${s.roll}')">${s.roll}</td>
            <td>${s.name}</td>
            <td>${s.branch}</td>
            <td>${s.course}</td>
            <td class="${color}">${s.attendance}%</td>
        </tr>`;
    });
}


// Search
function filterStudents() {
    let q = document.getElementById("searchInput").value.toLowerCase();
    let result = students.filter(s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q));
    renderTable(result);
}


// ADD STUDENT (Save to MySQL)
document.getElementById("studentForm").addEventListener("submit", async e => {
    e.preventDefault();

    const newStudent = {
        name: document.getElementById("sname").value,
        roll: document.getElementById("sroll").value.toUpperCase(),
        branch: document.getElementById("sbranch").value,
        course: document.getElementById("scourse").value,
        attendance: Math.floor(Math.random() * (98 - 40)) + 40
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent)
    });

    e.target.reset();
    loadStudents();
    alert("Student Added!");
});


// Modal open/edit/delete
let currentRoll = null;

function openModal(roll) {
    currentRoll = roll;
    let st = students.find(s => s.roll === roll);

    document.getElementById("editRoll").value = st.roll;
    document.getElementById("editName").value = st.name;
    document.getElementById("editBranch").value = st.branch;
    document.getElementById("editCourse").value = st.course;
    document.getElementById("editAttendance").value = st.attendance;

    document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

async function saveStudent() {
    let updated = {
        name: document.getElementById("editName").value,
        branch: document.getElementById("editBranch").value,
        course: document.getElementById("editCourse").value,
        attendance: Number(document.getElementById("editAttendance").value)
    };

    await fetch(`${API}/${currentRoll}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });

    closeModal();
    loadStudents();
    alert("Updated!");
}

async function deleteStudent() {
    if (!confirm("Are you sure?")) return;

    await fetch(`${API}/${currentRoll}`, { method: "DELETE" });

    closeModal();
    loadStudents();
    alert("Deleted!");
}


// Excel Export stays same
function downloadExcel() {
    const ws_data = [
        ["Roll No", "Name", "Branch", "Course", "Attendance %"],
        ...students.map(s => [s.roll, s.name, s.branch, s.course, s.attendance])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "attendance.xlsx");
}
