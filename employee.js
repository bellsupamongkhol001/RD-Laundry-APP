let employees = [];
let editingIndex = null;

function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  employees.forEach((emp, index) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.setAttribute("data-id", emp.id);
    card.setAttribute("data-name", emp.name);

    const imgSrc = emp.image ? emp.image : "https://via.placeholder.com/100";

    card.innerHTML = `
      <img src="${imgSrc}" alt="Employee Photo">
      <h3>${emp.name}</h3>
      <p>Employee ID: ${emp.id}</p>
      <p>Department: ${emp.dept}</p>
      <div class="card-actions">
        <button class="edit-btn" onclick="openEmployeeModal(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCards() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".employee-card");

  cards.forEach(card => {
    const id = card.getAttribute("data-id").toLowerCase();
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = id.includes(keyword) || name.includes(keyword) ? "block" : "none";
  });
}

function openEmployeeModal(index = null) {
  const modal = document.getElementById("modalOverlay");
  modal.style.display = "flex";

  if (index !== null) {
    const emp = employees[index];
    document.getElementById("empID").value = emp.id;
    document.getElementById("empName").value = emp.name;
    document.getElementById("empDept").value = emp.dept;
    editingIndex = index;
    document.getElementById("modalTitle").innerText = "Edit Employee";
  } else {
    document.getElementById("empID").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empDept").value = "";
    editingIndex = null;
    document.getElementById("modalTitle").innerText = "Add New Employee";
  }
}

function closeEmployeeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function saveEmployee() {
  const id = document.getElementById("empID").value.trim();
  const name = document.getElementById("empName").value.trim();
  const dept = document.getElementById("empDept").value.trim();
  const imageFile = document.getElementById("empImage").files[0];

  if (!id || !name || !dept) {
    alert("Please fill all required fields.");
    return;
  }

  let imageURL = "";
  if (imageFile) {
    imageURL = URL.createObjectURL(imageFile);
  }

  const newData = { id, name, dept, image: imageURL };

  if (editingIndex !== null) {
    employees[editingIndex] = newData;
  } else {
    employees.push(newData);
  }

  closeEmployeeModal();
  renderCards();
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderCards();
  }
}

renderCards();
