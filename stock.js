const stockItems = [
  { code: "RD-001", name: "Smock", size: "XL", color: "White", stock: 20 },
  { code: "RD-002", name: "Safety Shoes", size: "42", color: "Black", stock: 10 }
];

let countHistory = [];

function renderStockCards() {
  const container = document.getElementById("stockCardContainer");
  container.innerHTML = "";
  stockItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "stock-card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150?text=${item.name}" class="item-image" />
      <h3>${item.name}</h3>
      <p>Size: ${item.size}</p>
      <p>Color: ${item.color}</p>
      <p>Stock: ${item.stock}</p>
      <div class="card-actions">
        <button class="card-btn history" onclick="viewHistory('${item.code}')">📜 History</button>
        <button class="card-btn adjust" onclick="openAdjustStockModal('${item.code}')">🔧 Adjust</button>
        <button class="card-btn detail" onclick="viewDetails('${item.code}')">🔍 Detail</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openInventoryCountModal() {
  const tableBody = document.getElementById("countTableBody");
  tableBody.innerHTML = "";
  stockItems.forEach((item, idx) => {
    const row = document.createElement("tr");
    row.setAttribute("data-code", item.code);
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.size}</td>
      <td>${item.color}</td>
      <td>${item.stock}</td>
      <td>
        <input type="number" min="0" id="countInput-${item.code}" onchange="updateDiff('${item.code}')">
      </td>
      <td id="diff-${item.code}">-</td>
      <td>
        <button class="save-count-btn" onclick="confirmCount('${item.code}')" id="saveBtn-${item.code}">✔️ Confirm</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  document.getElementById("countModal").style.display = "flex";
}

function updateDiff(code) {
  const item = stockItems.find(i => i.code === code);
  const counted = parseInt(document.getElementById(`countInput-${code}`).value);
  if (!isNaN(counted)) {
    const diff = counted - item.stock;
    document.getElementById(`diff-${code}`).innerText = diff;
  }
}

function confirmCount(code) {
  const input = document.getElementById(`countInput-${code}`);
  const newCount = parseInt(input.value);
  const item = stockItems.find(i => i.code === code);
  if (isNaN(newCount)) {
    alert("Please enter a valid number.");
    return;
  }
  input.disabled = true;
  document.getElementById(`saveBtn-${code}`).innerText = "✏️ Edit";
  document.getElementById(`saveBtn-${code}`).onclick = () => editCount(code);
  const diff = newCount - item.stock;

  // Log history
  countHistory.push({
    date: new Date().toISOString().split("T")[0],
    code: item.code,
    name: item.name,
    previous: item.stock,
    counted: newCount,
    diff
  });

  item.stock = newCount;
  renderStockCards(); // Refresh cards
}

function editCount(code) {
  const input = document.getElementById(`countInput-${code}`);
  input.disabled = false;
  document.getElementById(`saveBtn-${code}`).innerText = "✔️ Confirm";
  document.getElementById(`saveBtn-${code}`).onclick = () => confirmCount(code);
}

function closeInventoryCountModal() {
  if (confirm("Are you sure you want to cancel stock count?")) {
    document.getElementById("countModal").style.display = "none";
  }
}

function exportStockCountHistory() {
  if (countHistory.length === 0) {
    alert("No data to export.");
    return;
  }

  let csv = "Date,Item Code,Item Name,Previous Count,Counted,Diff\n";
  countHistory.forEach(entry => {
    csv += `${entry.date},${entry.code},${entry.name},${entry.previous},${entry.counted},${entry.diff}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0,10);
  link.download = `stock_count_${date}.csv`;
  link.click();
}

function viewHistory(code) {
  alert(`View movement history for: ${code}`);
}

function openAdjustStockModal(code) {
  const newVal = prompt(`Enter new quantity for ${code}:`);
  const item = stockItems.find(i => i.code === code);
  if (!isNaN(newVal) && newVal !== null && newVal.trim() !== "") {
    item.stock = parseInt(newVal);
    renderStockCards();
  }
}

function viewDetails(code) {
  const tbody = document.getElementById("detailTableBody");
  tbody.innerHTML = `<tr><td colspan="4">Detail for ${code} coming soon...</td></tr>`;
  document.getElementById("detailModal").style.display = "flex";
}

function closeDetailModal() {
  document.getElementById("detailModal").style.display = "none";
}

// Init
renderStockCards();
