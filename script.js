// -------------------------------------------
//  60 INITIAL STUDENTS
// -------------------------------------------

let students = [];

for (let i = 1; i <= 10; i++) {
    students.push({
        roll: "23AI" + String(i).padStart(3, "0"),
        name: "Student " + i,
        branch: "AI&DS",
        course: "DBMS",
        attendance: Math.floor(Math.random() * (98 - 40)) + 40
    });
}


// -------------------------------------------
// RENDER TABLE
// -------------------------------------------

function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    students.forEach(s => {
        let color = s.attendance >= 75 ? "green" :
                    s.attendance >= 50 ? "yellow" : "red";

        tbody.innerHTML += `
        <tr>
            <td class="roll-clickable" onclick="openModal('${s.roll}')">${s.roll}</td>
            <td>${s.name}</td>
            <td>${s.branch}</td>
            <td>${s.course}</td>
            <td class="${color}">${s.attendance}%</td>
        </tr>
        `;
    });
}

renderTable();


// -------------------------------------------
// SEARCH FILTER
// -------------------------------------------

function filterStudents() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    students
        .filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.roll.toLowerCase().includes(query)
        )
        .forEach(s => {
            let color = s.attendance >= 75 ? "green" :
                        s.attendance >= 50 ? "yellow" : "red";

            tbody.innerHTML += `
                <tr>
                    <td class="roll-clickable" onclick="openModal('${s.roll}')">${s.roll}</td>
                    <td>${s.name}</td>
                    <td>${s.branch}</td>
                    <td>${s.course}</td>
                    <td class="${color}">${s.attendance}%</td>
                </tr>
            `;
        });
}


// -------------------------------------------
// ADD STUDENT
// -------------------------------------------

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let newStudent = {
        roll: document.getElementById("sroll").value,
        name: document.getElementById("sname").value,
        branch: document.getElementById("sbranch").value,
        course: document.getElementById("scourse").value,
        attendance: Math.floor(Math.random() * (98 - 40)) + 40
    };

    students.push(newStudent);
    renderTable();
    filterStudents();
    this.reset();
    alert("Student Added Successfully!");
});


// -------------------------------------------
// NOTICE BOARD
// -------------------------------------------

document.getElementById("postNotice").addEventListener("click", function() {
    let text = document.getElementById("noticeInput").value;
    if (text.trim() === "") return;

    let list = document.getElementById("noticeList");
    const li = document.createElement("li");
    li.textContent = "📌 " + text;
    list.appendChild(li);

    document.getElementById("noticeInput").value = "";
});


// -------------------------------------------
// DARK MODE
// -------------------------------------------

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", toggle.checked ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
    toggle.checked = true;
    document.body.classList.add("dark");
}


// -------------------------------------------
// EXCEL DOWNLOAD
// -------------------------------------------

function downloadExcel() {
    const ws_data = [
        ["Roll No", "Name", "Branch", "Course", "Attendance %"],
        ...students.map(s => [s.roll, s.name, s.branch, s.course, s.attendance + "%"])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "attendance_report.xlsx");
}


// -------------------------------------------
//  EDIT / DELETE STUDENT MODAL
// -------------------------------------------

let currentRoll = null;

// Open modal
function openModal(roll) {
    currentRoll = roll;

    let student = students.find(s => s.roll === roll);

    document.getElementById("editRoll").value = student.roll;
    document.getElementById("editName").value = student.name;
    document.getElementById("editBranch").value = student.branch;
    document.getElementById("editCourse").value = student.course;
    document.getElementById("editAttendance").value = student.attendance;

    document.getElementById("editModal").style.display = "flex";
}

// Close modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Save edited student
function saveStudent() {
    let student = students.find(s => s.roll === currentRoll);

    student.name = document.getElementById("editName").value;
    student.branch = document.getElementById("editBranch").value;
    student.course = document.getElementById("editCourse").value;
    student.attendance = Number(document.getElementById("editAttendance").value);

    renderTable();
    filterStudents();
    closeModal();
    alert("Student updated!");
}

// Delete student
function deleteStudent() {
    if (!confirm("Are you sure you want to delete this student?")) return;

    students = students.filter(s => s.roll !== currentRoll);

    renderTable();
    filterStudents();
    closeModal();
    alert("Student deleted successfully!");
}
