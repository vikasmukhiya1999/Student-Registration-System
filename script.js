const studentForm = document.getElementById("studentForm");
const recordsTable = document.getElementById("recordsTable");
const addStudentBtn = document.getElementById("addStudent");

//Validate users inputs
const validateInputs = () => {
  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("emailId").value.trim();
  const contact = document.getElementById("contactNo").value.trim();

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Student Name should only contain letters.");
    return false;
  }

  if (!/^[0-9]+$/.test(id)) {
    alert("Student ID should only contain numbers.");
    return false;
  }

  if (!/^[0-9]+$/.test(contact)) {
    alert("Contact No should only contain numbers.");
    return false;
  }

  if (!/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)) {
    alert("Please enter a valid email.");
    return false;
  }

  return { name, id, email, contact };
};

//Add new students to the local storage
const addNewStudent = () => {
  const validInputs = validateInputs();
  if (validInputs) {
    let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
    studentsData.push(validInputs);
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
    studentForm.reset();
  }
  loadStudentsData();
};

// Add new student on button click
addStudentBtn.addEventListener("click", addNewStudent);

// fetch data from local storage
const loadStudentsData = () => {
  recordsTable.innerHTML = ""; // Clear existing rows
  const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
  studentsData.forEach((studentsData, index) => {
    recordsTable.appendChild(createTableRow(studentsData, index));
  });
};

//create and render data into tables
const createTableRow = (studentsData, index) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
          <td>${studentsData.name}</td>
          <td>${studentsData.id}</td>
          <td>${studentsData.email}</td>
          <td>${studentsData.contact}</td>
          <td>
              <button id="editRecord" onclick="editRecord(${index})">Edit</button>
              <button id="deleteRecord" onclick="deleteRecord(${index})">Delete</button>
              </td>
              `;
  return tr;
};

// edit any data from existing data
const editRecord = (index) => {
  const records = JSON.parse(localStorage.getItem("studentsData")) || [];
  const record = records[index];

  document.getElementById("studentName").value = record.name;
  document.getElementById("studentId").value = record.id;
  document.getElementById("emailId").value = record.email;
  document.getElementById("contactNo").value = record.contact;

  // Update button text and behavior
  const addStudentBtn = document.getElementById("addStudent");
  addStudentBtn.textContent = "Update Student";

  const updateStudent = () => {
    const validInputs = validateInputs();
    if (validInputs) {
      // Update the record
      records[index] = validInputs;
      localStorage.setItem("studentsData", JSON.stringify(records));

      // Reload the table and reset the form
      loadStudentsData();
      studentForm.reset();

      // Revert button to "Add Student" mode
      addStudentBtn.textContent = "Add Student";
      addStudentBtn.removeEventListener("click", updateStudent);
      addStudentBtn.addEventListener("click", addNewStudent);
    }
  };

  // Temporarily replace the "Add" functionality with "Update"
  addStudentBtn.removeEventListener("click", addNewStudent);
  addStudentBtn.addEventListener("click", updateStudent);
};

//delete data from existing data
const deleteRecord = (index) => {
  const records = JSON.parse(localStorage.getItem("studentsData")) || [];
  records.splice(index, 1);
  localStorage.setItem("studentsData", JSON.stringify(records));
  loadStudentsData();
};
// call the function loadstudentsdata
loadStudentsData();
