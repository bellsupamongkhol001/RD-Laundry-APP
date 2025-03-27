let uniforms = [];
let editingIndex = null;

function renderUniformCards() {
  const container = document.getElementById("uniformCardContainer");
  container.innerHTML = "";

  uniforms.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "uniform-card";
    card.setAttribute("data-code", item.code);
    card.setAttribute("data-size", item.size);

    const imgSrc = item.image ? item.image : "https://via.placeholder.com/100";

    card.innerHTML = `
      <img src="${imgSrc}" alt="Uniform Image">
      <h3>${item.type}</h3>
      <p>Code: ${item.code}</p>
      <p>Size: ${item.size}</p>
      <p>Color: ${item.color}</p>
      <div class="card-actions">
        <button class="edit-btn" onclick="openUniformModal(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteUniform(${index})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterUniformCards() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".uniform-card");

  cards.forEach(card => {
    const code = card.getAttribute("data-code").toLowerCase();
    const size = card.getAttribute("data-size").toLowerCase();
    card.style.display = code.includes(input) || size.includes(input) ? "block" : "none";
  });
}

function openUniformModal(index = null) {
  const modal = document.getElementById("modalOverlay");
  modal.style.display = "flex";
  
  if (index !== null) {
    const u = uniforms[index];
    document.getElementById("uniformCode").value = u.code;
    document.getElementById("uniformType").value = u.type;
    document.getElementById("uniformSize").value = u.size;
    document.getElementById("uniformColor").value = u.color;
    editingIndex = index;
    document.getElementById("modalTitle").innerText = "Edit Uniform";
  } else {
    document.getElementById("uniformCode").value = "";
    document.getElementById("uniformType").value = "";
    document.getElementById("uniformSize").value = "";
    document.getElementById("uniformColor").value = "";
    editingIndex = null;
    document.getElementById("modalTitle").innerText = "Add New Uniform";
  }
}

function closeUniformModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function saveUniform() {
  const code = document.getElementById("uniformCode").value.trim();
  const type = document.getElementById("uniformType").value.trim();
  const size = document.getElementById("uniformSize").value.trim();
  const color = document.getElementById("uniformColor").value.trim();
  const imageFile = document.getElementById("uniformImage").files[0];

  if (!code || !type || !size || !color) {
    alert("Please fill all required fields.");
    return;
  }

  let imageURL = "";
  if (imageFile) {
    imageURL = URL.createObjectURL(imageFile);
  }

  const newData = { code, type, size, color, image: imageURL };

  if (editingIndex !== null) {
    uniforms[editingIndex] = newData;
  } else {
    uniforms.push(newData);
  }

  closeUniformModal();
  renderUniformCards();
}

function deleteUniform(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    uniforms.splice(index, 1);
    renderUniformCards();
  }
}

renderUniformCards();
